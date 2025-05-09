// components/notes/NoteForm.tsx
import React, { useState, useEffect } from 'react';
import { CreateNoteDto, Note, UpdateNoteDto } from '../../types/note.types';
import NoteEditor from './NoteEditor';

export interface NoteFormProps {
    onSubmit: (noteData: CreateNoteDto | UpdateNoteDto) => Promise<void>;
    isLoading: boolean;
    initialNote?: Note;
}

const NoteForm: React.FC<NoteFormProps> = ({
                                               onSubmit,
                                               isLoading,
                                               initialNote
                                           }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);

    // Initialize form data when initialNote changes
    useEffect(() => {
        if (initialNote) {
            setTitle(initialNote.title || '');
            setContent(initialNote.content || '');
            setIsPrivate(initialNote.isPrivate !== false);
        }
    }, [initialNote]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            return; // Basic validation
        }

        const noteData: CreateNoteDto = {
            title,
            content,
            isPrivate
        };

        await onSubmit(noteData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Note title"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <NoteEditor
                        value={content}
                        onChange={(value) => setContent(value)}
                        readOnly={false}
                    />
                </div>

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="isPrivate"
                            name="isPrivate"
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="isPrivate" className="font-medium text-gray-700">
                            Private Note
                        </label>
                        <p className="text-gray-500">Keep this note private and don't share it with others.</p>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm ${
                            isLoading
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        }`}
                    >
                        {isLoading ? 'Save Note' : 'Save Note'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default NoteForm;