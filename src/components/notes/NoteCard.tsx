import React, { useState } from 'react';
import Link from 'next/link';
import { Note } from '../../types/note.types';
import { formatDistanceToNow } from 'date-fns';
import ShareNoteModal from './ShareNoteModal';

interface NoteCardProps {
    note: Note;
    isShared?: boolean;
    onDelete?: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, isShared = false, onDelete }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const truncateContent = (content: string, maxLength = 100) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
    };

    const formattedDate = note.updatedAt
        ? formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })
        : 'Unknown date';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{note.title}</h3>
                    {!isShared && (
                        <div className="flex space-x-2">
                            <button
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => setIsShareModalOpen(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                </svg>
                            </button>
                            {onDelete && (
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => onDelete(note.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    )}
                </div>
                <p className="text-gray-600 mb-3 text-sm">{truncateContent(note.content)}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Updated {formattedDate}</span>
                    {isShared && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Shared</span>}
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 border-t text-right">
                <Link
                    href={`/notes/${note.id}`}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                >
                    {isShared ? 'View Note' : 'Edit Note'}
                </Link>
            </div>

            <ShareNoteModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                noteId={note.id}
            />
        </div>
    );
};

export default NoteCard;