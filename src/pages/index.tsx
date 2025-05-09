import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import Link from 'next/link';

const Home: NextPage = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    return (
        <Layout>
            <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Collaborative Notes Dashboard</h1>
                <p className="text-xl text-gray-600 max-w-2xl mb-8">
                    Create, share, and collaborate on notes with your team members.
                </p>
                <div className="flex space-x-4">
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Login
                    </Link>
                    <Link
                        href="/auth/register"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default Home;