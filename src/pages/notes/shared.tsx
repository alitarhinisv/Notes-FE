import { useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '../../components/layout/Layout';
import NoteList from '../../components/notes/NoteList';
import { withAuth } from '../../contexts/AuthContext';
import { useNotes } from '../../hooks/useNotes';

const SharedNotes: NextPage = () => {
    const { sharedNotes, fetchSharedNotes, loading, error } = useNotes();

    useEffect(() => {
        fetchSharedNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Shared With Me</h1>
                    <p className="mt-1 text-sm text-gray-500">Notes that others have shared with you.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <span className="block sm:inline">{error}</span>
                    </div>
                ) : (
                    <NoteList notes={sharedNotes} isShared />
                )}
            </div>
        </Layout>
    );
};

export default withAuth(SharedNotes);