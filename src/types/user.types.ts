export interface User {
    id: string;
    email: string;
    username: string;
    role: 'user' | 'admin';
    createdAt: string;
    updatedAt: string;
}

export interface UserRegistration {
    email: string;
    password: string;
    username: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserProfile {
    email: string;
    username: string;
}