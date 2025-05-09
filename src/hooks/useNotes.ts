import { useState, useEffect, useCallback } from 'react';
import {
    getAllNotes,
    getSharedNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
    shareNote
} from '../services/notes.service';
import {
    Note,
    CreateNoteDto,
    UpdateNoteDto,
    ShareNoteDto
} from '../types/note.types';

interface UseNotesState {
    notes: Note[];
    sharedNotes: Note[];
    currentNote: Note | null;
    loading: boolean;
    error: string | null;
}

export const useNotes = () => {
    const [state, setState] = useState<UseNotesState>({
        notes: [],
        sharedNotes: [],
        currentNote: null,
        loading: true,
        error: null,
    });

    // Fetch all user's notes
    const fetchNotes = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const notes = await getAllNotes();
            setState(prev => ({ ...prev, notes, loading: false, error: null }));
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.message || 'Failed to fetch notes'
            }));
        }
    }, []);

    // Fetch all notes shared with the user
    const fetchSharedNotes = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const sharedNotes = await getSharedNotes();
            setState(prev => ({ ...prev, sharedNotes, loading: false, error: null }));
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.message || 'Failed to fetch shared notes'
            }));
        }
    }, []);

    // Fetch a specific note by id
    const fetchNoteById = useCallback(async (id: string) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const note = await getNoteById(id);
            setState(prev => ({ ...prev, currentNote: note, loading: false, error: null }));
            return note;
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.message || 'Failed to fetch note'
            }));
            throw error;
        }
    }, []);

    // Create a new note
    const addNote = useCallback(async (noteData: CreateNoteDto) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const newNote = await createNote(noteData);
            setState(prev => ({
                ...prev,
                notes: [...prev.notes, newNote],
                loading: false,
                error: null
            }));
            return newNote;
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.message || 'Failed to create note'
            }));
            throw error;
        }
    }, []);

    // Update an existing note
    const editNote = useCallback(async (id: string, noteData: UpdateNoteDto) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const updatedNote = await updateNote(id, noteData);
            setState(prev => ({
                ...prev,
                notes: prev.notes.map(note => note.id === id ? updatedNote : note),
                currentNote: prev.currentNote?.id === id ? updatedNote : prev.currentNote,
                loading: false,
                error: null
            }));
            return updatedNote;
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.message || 'Failed to update note'
            }));
            throw error;
        }
    }, []);

    // Remove a note
    const removeNote = useCallback(async (id: string) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            await deleteNote(id);
            setState(prev => ({
                ...prev,
                notes: prev.notes.filter(note => note.id !== id),
                currentNote: prev.currentNote?.id === id ? null : prev.currentNote,
                loading: false,
                error: null
            }));
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.message || 'Failed to delete note'
            }));
            throw error;
        }
    }, []);

    // Share a note with another user
    const shareNoteWithUser = useCallback(async (noteId: string, shareData: ShareNoteDto) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const noteShare = await shareNote(noteId, shareData);
            setState(prev => ({ ...prev, loading: false, error: null }));
            return noteShare;
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.message || 'Failed to share note'
            }));
            throw error;
        }
    }, []);

    // Clear any errors
    const clearError = useCallback(() => {
        setState(prev => ({ ...prev, error: null }));
    }, []);

    return {
        ...state,
        fetchNotes,
        fetchSharedNotes,
        fetchNoteById,
        addNote,
        editNote,
        removeNote,
        shareNoteWithUser,
        clearError
    };
};