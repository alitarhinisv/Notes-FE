import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

const ProfileForm: React.FC = () => {
    const { user, updateProfile, error, loading, clearError } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearError();
        setSuccessMessage(null);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile(formData);
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => setSuccessMessage(null), 5000);
        } catch (err) {
            // Error is handled in the context
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-6">Your Profile</h2>

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    {successMessage}
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Username"
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <Input
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <div className="flex items-center justify-between pt-4">
                    <div className="text-sm text-gray-500">
                        Role: <span className="font-medium">{user?.role || 'User'}</span>
                    </div>
                    <Button
                        type="submit"
                        isLoading={loading}
                    >
                        Update Profile
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;