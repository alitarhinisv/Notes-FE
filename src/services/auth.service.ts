import api from '../utils/axios';
import { LoginResponse, UserLogin, UserRegistration } from '../types/auth.types';
import { setToken, removeToken } from '../utils/tokenStorage';
import { User, UserProfile } from '../types/user.types';

export const loginUser = async (credentials: UserLogin): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    const { token, user } = response.data;
    setToken(token);
    return response.data;
};

export const registerUser = async (userData: UserRegistration): Promise<void> => {
    await api.post('/users/register', userData);
};

export const logoutUser = (): void => {
    removeToken();
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get<User>('/users/profile');
    return response.data;
};

export const updateUserProfile = async (profileData: UserProfile): Promise<User> => {
    const response = await api.put<User>('/users/profile', profileData);
    return response.data;
};