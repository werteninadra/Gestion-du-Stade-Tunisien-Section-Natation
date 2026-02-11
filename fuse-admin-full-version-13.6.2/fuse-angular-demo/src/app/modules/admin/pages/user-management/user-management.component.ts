import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { RoleService } from 'app/core/user/role.service';
import { User, Role } from 'app/core/user/user.types';
import { FuseAlertType } from '@fuse/components/alert';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
    animations: fuseAnimations
})
export class UserManagementComponent implements OnInit {
    users: User[] = [];
    roles: Role[] = [];
    userForm: FormGroup;
    isEditing = false;
    editingUserId: number | null = null;
    showAlert = false;
    alert: { type: FuseAlertType; message: string } = { type: 'success', message: '' };

    constructor(
        private _userService: UserService,
        private _roleService: RoleService,
        private _formBuilder: FormBuilder,
        private _dialog: MatDialog
    ) {
        this.userForm = this._formBuilder.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadUsers();
        this.loadRoles();
    }

    loadUsers(): void {
        this._userService.getAllUsers().subscribe({
            next: (users) => this.users = users,
            error: (err) => this.showError('Failed to load users')
        });
    }

    loadRoles(): void {
        this._roleService.getAllRoles().subscribe({
            next: (roles) => this.roles = roles,
            error: (err) => console.error('Failed to load roles', err)
        });
    }

    onSubmit(): void {
        if (this.userForm.invalid) return;

        const user: User = this.userForm.value;

        if (this.isEditing && this.editingUserId) {
            this._userService.update({ ...user, id: this.editingUserId }).subscribe({
                next: () => {
                    this.showSuccess('User updated successfully');
                    this.loadUsers();
                    this.resetForm();
                },
                error: (err) => this.showError('Failed to update user')
            });
        } else {
            this._userService.addUser(user).subscribe({
                next: () => {
                    this.showSuccess('User created successfully');
                    this.loadUsers();
                    this.resetForm();
                },
                error: (err) => this.showError('Failed to create user')
            });
        }
    }

    editUser(user: User): void {
        this.isEditing = true;
        this.editingUserId = user.id || null;
        this.userForm.patchValue({
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            password: ''
        });
    }

    deleteUser(id: number): void {
        if (confirm('Are you sure you want to delete this user?')) {
            this._userService.deleteUser(id).subscribe({
                next: () => {
                    this.showSuccess('User deleted successfully');
                    this.loadUsers();
                },
                error: (err) => this.showError('Failed to delete user')
            });
        }
    }

    assignRole(userId: number, roleId: number): void {
        this._userService.assignRoleToUser(userId, roleId).subscribe({
            next: () => this.showSuccess('Role assigned successfully'),
            error: (err) => this.showError('Failed to assign role')
        });
    }

    resetForm(): void {
        this.isEditing = false;
        this.editingUserId = null;
        this.userForm.reset();
    }

    private showSuccess(message: string): void {
        this.alert = { type: 'success', message };
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 3000);
    }

    private showError(message: string): void {
        this.alert = { type: 'error', message };
        this.showAlert = true;
    }
}
