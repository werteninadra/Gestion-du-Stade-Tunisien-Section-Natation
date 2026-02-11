export interface User {
    id?: number;
    nom: string;
    prenom: string;
    email: string;
    password?: string;
    roles?: Role[];
    status?: string;
    avatar?: string;
    // Add name for template compatibility (combines nom and prenom)
    name?: string;
}

export interface Role {
    id?: number;
    nom: string;
    description?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}
