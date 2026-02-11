import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { User, LoginRequest } from 'app/core/user/user.types';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    private readonly apiUrl = environment.apiUrl;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post(`${this.apiUrl}/auth/forgot-password`, { email });
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post(`${this.apiUrl}/auth/reset-password`, { password });
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: LoginRequest): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError(() => new Error('User is already logged in.'));
        }

        return this._httpClient.post(this.apiUrl + '/auth/login', credentials, {
            responseType: 'text'
        }).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Return success
                return of(response);
            }),
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Check if the access token exists and didn't expire
        if ( !this.accessToken || AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // Set the authenticated flag to true
        this._authenticated = true;

        // Return success
        return of(true);
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: User): Observable<any>
    {
        return this._httpClient.post(`${this.apiUrl}/auth/register`, user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post(`${this.apiUrl}/auth/unlock-session`, credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
