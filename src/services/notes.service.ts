import api from '../utils/axios';
import {
    Note,
    CreateNoteDto,
    UpdateNoteDto,
    ShareNoteDto,
    NoteShare
} from '../types/note.types';

export const getAllNotes = async (): Promise<Note[]> => {
    const response = await api.get<Note[]>('/notes');
    return response.data;
};

export const getSharedNotes = async (): Promise<Note[]> => {
    const response = await api.get<Note[]>('/notes/shared');
    return response.data;
};

export const getNoteById = async (id: string): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
};

export const createNote = async (noteData: CreateNoteDto): Promise<Note> => {
    const response = await api.post<Note>('/notes', noteData);
    return response.data;
};

export const updateNote = async (id: string, noteData: UpdateNoteDto): Promise<Note> => {
    const response = await api.put<Note>(`/notes/${id}`, noteData);
    return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
};

export const shareNote = async (noteId: string, shareData: ShareNoteDto): Promise<NoteShare> => {
    const response = await api.post<NoteShare>(`/notes/${noteId}/share`, shareData);
    return response.data;
};