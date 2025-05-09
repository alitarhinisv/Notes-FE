// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {
    AuthContextType,
    AuthState,
    UserLogin
} from '../types/auth.types';
import {
    loginUser,
    registerUser as register,
    logoutUser,
    getCurrentUser,
    updateUserProfile
} from '../services/auth.service';
import { UserProfile, UserRegistration } from '../types/user.types';
import { getToken } from '../utils/tokenStorage';
import { useRouter } from 'next/router';

// Initial state
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    error: null,
};

// Create context
export const AuthContext = createContext<AuthContextType>({
    ...initialState,
    login: async () => {},
    register: async () => {},
    logout: () => {},
    updateProfile: async () => {},
    clearError: () => {},
});

// Action types
type AuthAction =
    | { type: 'LOGIN_SUCCESS'; payload: { user: any; token: string } }
    | { type: 'REGISTER_SUCCESS' }
    | { type: 'LOGOUT' }
    | { type: 'AUTH_ERROR'; payload: string }
    | { type: 'USER_LOADED'; payload: any }
    | { type: 'PROFILE_UPDATED'; payload: any }
    | { type: 'CLEAR_ERROR' };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload.user,
                token: action.payload.token,
                error: null,
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
            };
        case 'PROFILE_UPDATED':
            return {
                ...state,
                user: { ...state.user, ...action.payload },
                loading: false,
                error: null,
            };
        case 'AUTH_ERROR':
        case 'LOGOUT':
            return {
                ...initialState,
                loading: false,
                error: action.type === 'AUTH_ERROR' ? action.payload : null,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const router = useRouter();

    // Check if the user is authenticated on component mount
    useEffect(() => {
        const loadUser = async () => {
            const token = getToken();

            if (!token) {
                dispatch({ type: 'LOGOUT' });
                return;
            }

            try {
                const userData = await getCurrentUser();
                dispatch({ type: 'USER_LOADED', payload: userData });
            } catch (error) {
                dispatch({ type: 'AUTH_ERROR', payload: 'Authentication failed' });
            }
        };

        loadUser();
    }, []);

    // Login function
    const login = async (credentials: UserLogin) => {
        try {
            const data = await loginUser(credentials);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user: data.user, token: data.token },
            });
            router.push('/dashboard');
        } catch (error: any) {
            dispatch({
                type: 'AUTH_ERROR',
                payload: error.response?.data?.message || 'Login failed',
            });
        }
    };

    // Register function
    const registerUser = async (userData: UserRegistration) => {
        try {
            await register(userData);
            dispatch({ type: 'REGISTER_SUCCESS' });
            router.push('/auth/login');
        } catch (error: any) {
            dispatch({
                type: 'AUTH_ERROR',
                payload: error.response?.data?.message || 'Registration failed',
            });
        }
    };

    // Logout function
    const logout = () => {
        logoutUser();
        dispatch({ type: 'LOGOUT' });
        router.push('/auth/login');
    };

    // Update profile function
    const updateProfile = async (profileData: UserProfile) => {
        try {
            const updatedUser = await updateUserProfile(profileData);
            dispatch({ type: 'PROFILE_UPDATED', payload: updatedUser });
        } catch (error: any) {
            dispatch({
                type: 'AUTH_ERROR',
                payload: error.response?.data?.message || 'Profile update failed',
            });
        }
    };

    // Clear error function
    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register: registerUser,
                logout,
                updateProfile,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Higher-order component for protected routes
export const withAuth = (Component: React.ComponentType) => {
    const AuthenticatedComponent = (props: any) => {
        const { isAuthenticated, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !isAuthenticated) {
                router.replace('/auth/login');
            }
        }, [isAuthenticated, loading, router]);

        if (loading) {
            return <div>Loading...</div>;
        }

        return isAuthenticated ? <Component {...props} /> : null;
    };

    return AuthenticatedComponent;
};

// Higher-order component for admin-only routes
export const withAdmin = (Component: React.ComponentType) => {
    const AdminComponent = (props: any) => {
        const { isAuthenticated, loading, user } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && (!isAuthenticated || (user && user.role !== 'admin'))) {
                router.replace('/dashboard');
            }
        }, [isAuthenticated, loading, router, user]);

        if (loading) {
            return <div>Loading...</div>;
        }

        return isAuthenticated && user?.role === 'admin' ? <Component {...props} /> : null;
    };

    return AdminComponent;
};