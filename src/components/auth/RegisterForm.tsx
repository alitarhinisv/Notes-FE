import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Link from 'next/link';

const RegisterForm: React.FC = () => {
    const {register, error, loading, clearError} = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearError();
        setPasswordError(null);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        // Register new user
        const {username, email, password} = formData;
        await register({username, email, password});
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                         role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <Input
                    label="Username"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
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
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <Input
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={passwordError || undefined}
                    required
                    fullWidth
                />

                <div className="flex items-center justify-between mb-6">
                    <Button
                        type="submit"
                        isLoading={loading}
                        fullWidth
                    >
                        Register
                    </Button>
                </div>

                <div className="text-center">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-blue-500 hover:text-blue-700">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;