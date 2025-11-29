import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Admin API
export const adminAPI = {
  login: (username, password) => api.post('/admin/login', { username, password }),
  getProfile: () => api.get('/admin/profile'),
};

// Notes API
export const notesAPI = {
  getNotes: (params = {}) => api.get('/notes', { params }),
  getDeletedNotes: () => api.get('/notes/trash/all'),
  createNote: (noteData) => api.post('/notes', noteData),
  getNoteById: (id) => api.get(`/notes/${id}`),
  updateNote: (id, noteData) => api.put(`/notes/${id}`, noteData),
  deleteNote: (id) => api.delete(`/notes/${id}`),
  restoreNote: (id) => api.patch(`/notes/${id}/restore`),
  permanentlyDeleteNote: (id) => api.delete(`/notes/${id}/permanent`),
  togglePin: (id) => api.patch(`/notes/${id}/pin`),
};

export default api;
