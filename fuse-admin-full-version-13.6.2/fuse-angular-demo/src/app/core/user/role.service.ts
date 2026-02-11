import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from 'app/core/user/user.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoleService
{
    private readonly apiUrl = environment.apiUrl;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all roles
     */
    getAllRoles(): Observable<Role[]>
    {
        return this._httpClient.get<Role[]>(`${this.apiUrl}/roles/all`);
    }

    /**
     * Add a new role
     *
     * @param role
     */
    addRole(role: Role): Observable<Role>
    {
        return this._httpClient.post<Role>(`${this.apiUrl}/roles/add`, role);
    }

    /**
     * Update the role
     *
     * @param id
     * @param role
     */
    updateRole(id: number, role: Role): Observable<Role>
    {
        return this._httpClient.put<Role>(`${this.apiUrl}/roles/update/${id}`, role);
    }

    /**
     * Delete the role
     *
     * @param id
     */
    deleteRole(id: number): Observable<void>
    {
        return this._httpClient.delete<void>(`${this.apiUrl}/roles/delete/${id}`);
    }
}
