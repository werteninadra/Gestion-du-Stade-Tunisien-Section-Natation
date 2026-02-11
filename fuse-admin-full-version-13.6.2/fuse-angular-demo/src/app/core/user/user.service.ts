import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private readonly apiUrl = environment.apiUrl;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Create a user object with name derived from nom and prenom
        const userWithName: User = {
            ...value,
            name: value.nom + ' ' + value.prenom
        };
        // Store the value
        this._user.next(userWithName);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     * Since the backend returns a list, we take the first user for now
     * In production, you should have a /users/me endpoint
     */
    get(): Observable<User>
    {
        return this._httpClient.get<User[]>(`${this.apiUrl}/users/all`).pipe(
            map((users) => {
                if (users && users.length > 0) {
                    // Set name from nom and prenom
                    const user = users[0];
                    user.name = user.nom + ' ' + user.prenom;
                    return user;
                }
                // Return a default user structure
                return {
                    nom: '',
                    prenom: '',
                    email: '',
                    name: ''
                } as User;
            }),
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Get all users
     */
    getAllUsers(): Observable<User[]>
    {
        return this._httpClient.get<User[]>(`${this.apiUrl}/users/all`).pipe(
            map((users) => {
                // Add name property for each user
                return users.map(user => ({
                    ...user,
                    name: user.nom + ' ' + user.prenom
                }));
            })
        );
    }

    /**
     * Add a new user
     *
     * @param user
     */
    addUser(user: User): Observable<User>
    {
        return this._httpClient.post<User>(`${this.apiUrl}/users/add`, user);
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<User>
    {
        if (!user.id) {
            return this.addUser(user);
        }
        return this._httpClient.put<User>(`${this.apiUrl}/users/update/${user.id}`, user);
    }

    /**
     * Delete the user
     *
     * @param id
     */
    deleteUser(id: number): Observable<void>
    {
        return this._httpClient.delete<void>(`${this.apiUrl}/users/delete/${id}`);
    }

    /**
     * Assign role to user
     *
     * @param userId
     * @param roleId
     */
    assignRoleToUser(userId: number, roleId: number): Observable<User>
    {
        return this._httpClient.put<User>(`${this.apiUrl}/users/${userId}/roles/${roleId}`, {});
    }
}
