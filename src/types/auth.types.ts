import {User, UserProfile} from "./user.types";

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export interface AuthContextType extends AuthState {
    login: (credentials: UserLogin) => Promise<void>;
    register: (userData: UserRegistration) => Promise<void>;
    logout: () => void;
    updateProfile: (profileData: UserProfile) => Promise<void>;
    clearError: () => void;
    reloadUser: () => Promise<void>;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export interface AuthContextType extends AuthState {
    login: (credentials: UserLogin) => Promise<void>;
    register: (userData: UserRegistration) => Promise<void>;
    logout: () => void;
    updateProfile: (profileData: UserProfile) => Promise<void>;
    clearError: () => void;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface UserRegistration {
    email: string;
    password: string;
    username: string;
}