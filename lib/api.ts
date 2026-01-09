import axios from 'axios';
import type { Note, FormValues } from '../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});


export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};

export const fetchNotes = async (
  search: string,
  page: number
): Promise<FetchNotesResponse> => {
  const { data } = await instance.get<FetchNotesResponse>('/notes', {
    params: { search, page, perPage: 12 },
  });

  return data;
};

export const createNote = async (
  values: FormValues
): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', values);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};