import React from 'react';
import { Note } from '../../types/note.types';
import NoteCard from './NoteCard';
import Link from 'next/link';

interface NoteListProps {
    notes: Note[];
    isShared?: boolean;
    onDelete?: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, isShared = false, onDelete }) => {
    if (notes.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {isShared ? "No notes have been shared with you yet." : "You don't have any notes yet."}
                </h3>
                {!isShared && (
                    <Link
                        href="/notes/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Create your first note
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    isShared={isShared}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default NoteList;