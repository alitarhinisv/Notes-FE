import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import NoteForm from '../../components/notes/NoteForm';
import { withAuth } from '../../contexts/AuthContext';
import { useNotes } from '../../hooks/useNotes';
import {CreateNoteDto, UpdateNoteDto} from '../../types/note.types';

const NewNote: NextPage = () => {
    const { addNote, loading, error } = useNotes();
    const router = useRouter();
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (noteData: CreateNoteDto | UpdateNoteDto) => {
        try {
            setFormError(null); // Clear previous errors
            const newNote = await addNote(noteData);
            if (newNote?.id) {
                router.push(`/notes/${newNote.id}`);
            } else {
                setFormError('Failed to create note: No ID returned');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create note';
            setFormError(errorMessage);
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Create New Note</h1>
                    <p className="mt-1 text-sm text-gray-500">Write a new note and save it to your collection.</p>
                </div>

                {(error || formError) && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                        <span className="block sm:inline">{error || formError}</span>
                    </div>
                )}

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <NoteForm onSubmit={handleSubmit} isLoading={loading} initialNote={undefined} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default withAuth(NewNote);