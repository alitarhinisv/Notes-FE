import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
    const router = useRouter();
    const { user } = useAuth();

    const isActive = (path: string) => router.pathname === path;

    return (
        <aside className="w-64 bg-gray-100 h-screen p-4">
            <nav className="mt-5">
                <ul className="space-y-2">
                    <li>
                        <Link
                            href="/dashboard"
                            className={`block p-2 rounded-lg ${
                                isActive('/dashboard') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/notes"
                            className={`block p-2 rounded-lg ${
                                isActive('/notes') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            My Notes
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/notes/shared"
                            className={`block p-2 rounded-lg ${
                                isActive('/notes/shared') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Shared With Me
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/profile"
                            className={`block p-2 rounded-lg ${
                                isActive('/profile') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Profile
                        </Link>
                    </li>
                    {user?.role === 'admin' && (
                        <li>
                            <Link
                                href="/admin/users"
                                className={`block p-2 rounded-lg ${
                                    isActive('/admin/users') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Manage Users
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;