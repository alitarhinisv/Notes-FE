// src/components/layout/Layout.tsx
import React, { ReactNode } from 'react';
import Header from './Header';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
    children: ReactNode;
    withSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, withSidebar = false }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-gray-50">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;