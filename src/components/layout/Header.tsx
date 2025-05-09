import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold text-blue-600">
                                Notes Dashboard
                            </Link>
                        </div>

                        {isAuthenticated && (
                            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href="/dashboard"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/notes"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    My Notes
                                </Link>
                                <Link
                                    href="/notes/shared"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Shared With Me
                                </Link>
                                {user?.role === 'admin' && (
                                    <Link
                                        href="/admin/users"
                                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Manage Users
                                    </Link>
                                )}
                            </nav>
                        )}
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {isAuthenticated ? (
                            <div className="ml-3 relative flex items-center space-x-4">
                                <Link
                                    href="/profile"
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    {user?.username || 'Profile'}
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="ml-3 relative flex items-center space-x-4">
                                <Link
                                    href="/auth/login"
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;