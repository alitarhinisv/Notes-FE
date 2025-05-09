import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Link from 'next/link';

const LoginForm: React.FC = () => {
    const { login, error, loading, clearError } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearError();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(formData);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Log In</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

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

                <div className="flex items-center justify-between mb-6">
                    <Button
                        type="submit"
                        isLoading={loading}
                        fullWidth
                    >
                        Sign In
                    </Button>
                </div>

                <div className="text-center">
                    <p className="text-gray-600 text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="/auth/register" className="text-blue-500 hover:text-blue-700">
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;