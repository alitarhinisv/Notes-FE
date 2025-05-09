// src/pages/notes/index.tsx
import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import NoteList from '../../components/notes/NoteList';
import Button from '../../components/ui/Button';
import { withAuth } from '../../contexts/AuthContext';
import { useNotes } from '../../hooks/useNotes';

const Notes: NextPage = () => {
    const { notes, fetchNotes, removeNote, loading, error } = useNotes();
    const router = useRouter();

    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreateNote = () => {
        router.push('/notes/new');
    };

    const handleDeleteNote = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await removeNote(id);
            } catch (err) {
                // Error is handled in the hook
            }
        }
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">My Notes</h1>
                        <p className="mt-1 text-sm text-gray-500">Manage your personal notes.</p>
                    </div>
                    <Button onClick={handleCreateNote}>
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        New Note
                    </Button>
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
                    <NoteList notes={notes} onDelete={handleDeleteNote} />
                )}
            </div>
        </Layout>
    );
};

export default withAuth(Notes);