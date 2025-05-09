import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import NoteForm from '../../components/notes/NoteForm';
import NoteEditor from '../../components/notes/NoteEditor';
import ShareNoteModal from '../../components/notes/ShareNoteModal';
import Button from '../../components/ui/Button';
import { withAuth, useAuth } from '../../contexts/AuthContext';
import { useNotes } from '../../hooks/useNotes';
import { UpdateNoteDto } from '../../types/note.types';

const NoteDetail: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { user, loading: authLoading } = useAuth();
    const {
        currentNote,
        fetchNoteById,
        editNote,
        removeNote,
        loading: noteLoading,
        error
    } = useNotes();
    const [formError, setFormError] = useState<string | null>(null);
    const [isShared, setIsShared] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const isNoteOwner = () => {
        if (!currentNote || !user) return false;
        const noteOwner = typeof currentNote.owner === 'string' 
            ? currentNote.owner 
            : currentNote.owner.username;
        return noteOwner === user.username;
    };

    useEffect(() => {
        if (id && typeof id === 'string' && !authLoading) {
            const loadNote = async () => {
                try {
                    const note = await fetchNoteById(id);
                    if(note.sharedWith.length == 0) {
                        setIsShared(false);
                    } else {
                        setIsShared(true);
                    }
                } catch (err) {
                    // Error is handled in the hook
                }
            };
            loadNote();
        }
    }, [id, authLoading, fetchNoteById]);

    const handleUpdate = async (noteData: UpdateNoteDto) => {
        if (!id || typeof id !== 'string') return;

        try {
            await editNote(id, noteData);
            router.push('/notes');
        } catch (err: any) {
            setFormError(err.message || 'Failed to update note');
        }
    };

    const handleDelete = async () => {
        if (!id || typeof id !== 'string' || !isNoteOwner()) return;

        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await removeNote(id);
                router.push('/notes');
            } catch (err) {
                // Error is handled in the hook
            }
        }
    };

    const handleShare = () => {
        if (!isNoteOwner()) return;
        setIsShareModalOpen(true);
    };

    if (authLoading || (noteLoading && !currentNote)) {
        return (
            <Layout>
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Layout>
        );
    }

    if (error || !currentNote) {
        return (
            <Layout>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <span className="block sm:inline">{error || 'Note not found'}</span>
                    </div>
                    <div className="mt-4">
                        <Button onClick={() => router.push('/notes')}>
                            Back to Notes
                        </Button>
                    </div>
                </div>
            </Layout>
        );
    }

    const canEdit = isNoteOwner();

    return (
        <Layout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">{canEdit ? 'Edit Note' : 'View Note'}</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            {canEdit
                                ? 'Make changes to your note and save them.'
                                : isNoteOwner()
                                    ? 'This note has been shared with others. You cannot edit it.'
                                    : 'This note belongs to another user. You can only view it.'}
                        </p>
                    </div>
                    {isNoteOwner() && (
                        <div className="flex space-x-3">
                            <Button variant="primary" onClick={handleShare}>
                                Share
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {(error || formError) && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                        <span className="block sm:inline">{error || formError}</span>
                    </div>
                )}

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        {!canEdit ? (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-medium text-gray-900 mb-4">{currentNote.title}</h2>
                                    <NoteEditor
                                        value={currentNote.content}
                                        onChange={() => {}}
                                        readOnly
                                    />
                                </div>
                            </div>
                        ) : (
                            <NoteForm
                                initialNote={currentNote}
                                onSubmit={handleUpdate}
                                isLoading={noteLoading}
                            />
                        )}
                    </div>
                </div>
            </div>

            <ShareNoteModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                noteId={currentNote.id}
            />
        </Layout>
    );
};

export default withAuth(NoteDetail);