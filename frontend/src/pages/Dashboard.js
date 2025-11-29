import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { notesAPI } from '../services/api';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import Header from '../components/Header';
import './Dashboard.css';
import { FiPlus, FiSearch } from 'react-icons/fi';

export default function Dashboard() {
  const { logout, admin } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, category]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const params = {
        sort: sortBy,
      };
      if (category !== 'all') params.category = category;
      if (searchTerm) params.search = searchTerm;

      const response = await notesAPI.getNotes(params);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 0 || term.length === 0) {
      setTimeout(() => fetchNotes(), 300);
    }
  };

  const handleAddNote = async (noteData) => {
    try {
      const response = await notesAPI.createNote(noteData);
      setNotes([response.data, ...notes]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      const response = await notesAPI.updateNote(editingNote._id, noteData);
      setNotes(notes.map((n) => (n._id === editingNote._id ? response.data : n)));
      setEditingNote(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await notesAPI.deleteNote(id);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleTogglePin = async (id) => {
    try {
      const response = await notesAPI.togglePin(id);
      setNotes(notes.map((n) => (n._id === id ? response.data : n)));
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingNote(null);
  };

  const pinnedNotes = notes.filter((n) => n.pinned);
  const unpinnedNotes = notes.filter((n) => !n.pinned);

  return (
    <div className="dashboard">
      <Header admin={admin} onLogout={logout} />

      <div className="dashboard-content">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>My Notes</h1>

          <div className="controls">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="createdAt">Newest</option>
              <option value="updated">Updated</option>
              <option value="title">Title</option>
            </select>

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="idea">Idea</option>
              <option value="general">General</option>
            </select>

            <motion.button
              className="btn-add-note"
              onClick={() => setIsFormOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlus /> New Note
            </motion.button>
          </div>
        </motion.div>

        {isFormOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseForm}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <NoteForm
                note={editingNote}
                onSubmit={editingNote ? handleUpdateNote : handleAddNote}
                onClose={handleCloseForm}
              />
            </motion.div>
          </motion.div>
        )}

        <div className="notes-container">
          {loading ? (
            <motion.div
              className="loading"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Loading notes...
            </motion.div>
          ) : notes.length === 0 ? (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>📝 No notes yet. Create your first note!</p>
            </motion.div>
          ) : (
            <>
              {pinnedNotes.length > 0 && (
                <motion.div
                  className="notes-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h2>📌 Pinned Notes</h2>
                  <div className="notes-grid">
                    <AnimatePresence>
                      {pinnedNotes.map((note) => (
                        <NoteCard
                          key={note._id}
                          note={note}
                          onEdit={handleEditNote}
                          onDelete={handleDeleteNote}
                          onTogglePin={handleTogglePin}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {unpinnedNotes.length > 0 && (
                <motion.div
                  className="notes-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2>📋 All Notes</h2>
                  <div className="notes-grid">
                    <AnimatePresence>
                      {unpinnedNotes.map((note) => (
                        <NoteCard
                          key={note._id}
                          note={note}
                          onEdit={handleEditNote}
                          onDelete={handleDeleteNote}
                          onTogglePin={handleTogglePin}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
