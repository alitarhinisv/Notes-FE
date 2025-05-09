import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useNotes } from '../../hooks/useNotes';
import { getAllUsers } from '../../services/users.service';
import { User } from '../../types/user.types';

interface ShareNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    noteId: string;
}

const ShareNoteModal: React.FC<ShareNoteModalProps> = ({ isOpen, onClose, noteId }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { shareNoteWithUser } = useNotes();

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getAllUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                setError('Failed to load users');
            }
        };

        if (isOpen) {
            fetchUsers();
        }
    }, [isOpen]);

    const handleShareNote = async () => {
        if (!selectedUserId) {
            setError('Please select a user to share with');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            await shareNoteWithUser(noteId, { userId: selectedUserId });
            setSuccess('Note shared successfully!');
            setTimeout(() => {
                onClose();
                setSuccess(null);
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to share note');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Share Note">
            <div className="space-y-4">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                        {success}
                    </div>
                )}

                <div>
                    <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                        Select User
                    </label>
                    <select
                        id="user"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                    >
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username} ({user.email})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleShareNote}
                        isLoading={loading}
                    >
                        Share
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ShareNoteModal;