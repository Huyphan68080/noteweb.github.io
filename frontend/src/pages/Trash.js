import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { notesAPI } from '../services/api';
import { ThemeContext } from '../context/ThemeContext';
import './Trash.css';
import { FiTrash2, FiRotateCcw, FiArrowLeft } from 'react-icons/fi';

export default function Trash() {
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchDeletedNotes();
  }, []);

  const fetchDeletedNotes = async () => {
    setLoading(true);
    try {
      const response = await notesAPI.getDeletedNotes();
      setDeletedNotes(response.data);
    } catch (error) {
      console.error('Error fetching deleted notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    try {
      await notesAPI.restoreNote(id);
      setDeletedNotes(deletedNotes.filter((n) => n._id !== id));
    } catch (error) {
      console.error('Error restoring note:', error);
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      await notesAPI.permanentlyDeleteNote(id);
      setDeletedNotes(deletedNotes.filter((n) => n._id !== id));
    } catch (error) {
      console.error('Error permanently deleting note:', error);
    }
  };

  const handleEmptyTrash = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vĩnh viễn tất cả ghi chú?')) {
      try {
        for (const note of deletedNotes) {
          await notesAPI.permanentlyDeleteNote(note._id);
        }
        setDeletedNotes([]);
      } catch (error) {
        console.error('Error emptying trash:', error);
      }
    }
  };

  return (
    <div className="trash-container">
      <motion.div
        className="trash-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="trash-title">
          <motion.button
            className="back-btn"
            onClick={() => navigate('/dashboard')}
            whileHover={{ scale: 1.1 }}
          >
            <FiArrowLeft /> Quay lại
          </motion.button>
          <h1>🗑️ Thùng Rác</h1>
        </div>

        {deletedNotes.length > 0 && (
          <motion.button
            className="empty-trash-btn"
            onClick={handleEmptyTrash}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiTrash2 /> Xóa vĩnh viễn tất cả
          </motion.button>
        )}
      </motion.div>

      <div className="trash-content">
        {deletedNotes.length === 0 ? (
          <motion.div
            className="empty-trash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>Thùng rác trống</p>
          </motion.div>
        ) : (
          <div className="trash-grid">
            {deletedNotes.map((note) => (
              <motion.div
                key={note._id}
                className="trash-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <h3>{note.title}</h3>
                <p>{note.content.substring(0, 100)}...</p>
                <small>Xóa: {new Date(note.deletedAt || Date.now()).toLocaleDateString('vi-VN')}</small>

                <div className="trash-actions">
                  <motion.button
                    className="restore-btn"
                    onClick={() => handleRestore(note._id)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiRotateCcw /> Khôi phục
                  </motion.button>
                  <motion.button
                    className="delete-btn"
                    onClick={() => handlePermanentDelete(note._id)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiTrash2 /> Xóa vĩnh viễn
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
