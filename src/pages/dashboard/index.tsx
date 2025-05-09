import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import NoteList from '../../components/notes/NoteList';
import { withAuth, useAuth } from '../../contexts/AuthContext';
import { useNotes } from '../../hooks/useNotes';
import { Note } from '../../types/note.types';

const Dashboard: NextPage = () => {
    const { notes, sharedNotes, fetchNotes, fetchSharedNotes, loading, error } = useNotes();
    const { user } = useAuth();
    const [recentNotes, setRecentNotes] = useState<Note[]>([]);
    const [recentSharedNotes, setRecentSharedNotes] = useState<Note[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchNotes();
        if (user?.role !== 'admin') {
            fetchSharedNotes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Get the most recent 3 notes
        setRecentNotes(
            [...notes].sort(
                (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            ).slice(0, 3)
        );
    }, [notes]);

    useEffect(() => {
        // Get the most recent 3 shared notes
        setRecentSharedNotes(
            [...sharedNotes].sort(
                (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            ).slice(0, 3)
        );
    }, [sharedNotes]);

    const handleCreateNote = () => {
        router.push('/notes/new');
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">Welcome to your notes dashboard.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Stats Cards */}
                    <div className="bg-white overflow-hidden shadow rounded-lg flex-1">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="ml-5">
                                    <h3 className="text-lg font-medium text-gray-900">My Notes</h3>
                                    <div className="mt-1 text-3xl font-semibold text-gray-900">{notes.length}</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-4 sm:px-6">
                            <Link href="/notes" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                View all notes
                            </Link>
                        </div>
                    </div>

                    {user?.role !== 'admin' && (
                        <div className="bg-white overflow-hidden shadow rounded-lg flex-1">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5">
                                        <h3 className="text-lg font-medium text-gray-900">Shared With Me</h3>
                                        <div className="mt-1 text-3xl font-semibold text-gray-900">{sharedNotes.length}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-4 sm:px-6">
                                <Link href="/notes/shared" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                    View shared notes
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-900">Recent Notes</h2>
                        <button
                            onClick={handleCreateNote}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            New Note
                        </button>
                    </div>

                    <div className="mt-4">
                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : error ? (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        ) : (
                            <NoteList notes={recentNotes} onDelete={() => fetchNotes()} />
                        )}
                    </div>
                </div>

                {user?.role !== 'admin' && (
                    <div className="mt-8">
                        <h2 className="text-lg font-medium text-gray-900">Recent Shared Notes</h2>
                        <div className="mt-4">
                            {loading ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : error ? (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            ) : (
                                <NoteList notes={recentSharedNotes} isShared />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default withAuth(Dashboard);