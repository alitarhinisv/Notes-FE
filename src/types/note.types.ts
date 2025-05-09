import {User} from "./user.types";

export interface Note {
    id: string;
    title: string;
    content: string;
    owner: User | string;
    createdAt: string;
    updatedAt: string;
    sharedWith: [];
    isPrivate?: boolean;
    isShared?: boolean;
}


export interface ShareNoteDto {
    userId: string;
}

export interface NoteShare {
    id: string;
    note: Note;
    user: User;
    createdAt: string;
}



export interface CreateNoteDto {
    title: string;
    content: string;
    isPrivate?: boolean;
}

export interface UpdateNoteDto {
    title?: string;
    content?: string;
    isPrivate?: boolean;
}