import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiEdit2, FiMapPin } from 'react-icons/fi';
import './NoteCard.css';

export default function NoteCard({ note, onEdit, onDelete, onTogglePin }) {
  const [isHovered, setIsHovered] = useState(false);
  const isDarkMode = document.body.classList.contains('dark-mode');

  const getCategoryColor = (category) => {
    const colors = {
      work: '#ffebee',
      personal: '#f3e5f5',
      idea: '#e3f2fd',
      general: '#fff9e6',
    };
    return colors[category] || '#fff9e6';
  };

  const getContrastTextColor = (bgColor) => {
    if (isDarkMode) return '#333';
    
    if (!bgColor) bgColor = '#fff9e6';
    
    const rgb = parseInt(bgColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    
    return lum > 128 ? '#333' : '#fff';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      work: '💼 Work',
      personal: '👤 Personal',
      idea: '💡 Idea',
      general: '📝 General',
    };
    return labels[category] || category;
  };

  const cardBgColor = getCategoryColor(note.category);

  return (
    <motion.div
      className="note-card"
      style={{ 
        backgroundColor: cardBgColor,
        color: getContrastTextColor(cardBgColor)
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="note-header">
        <h3>{note.title}</h3>
        <motion.button
          className="pin-btn"
          onClick={() => onTogglePin(note._id)}
          animate={{ color: note.pinned ? '#667eea' : '#999' }}
          title={note.pinned ? 'Unpin note' : 'Pin note'}
        >
          <FiMapPin fill={note.pinned ? '#667eea' : 'none'} />
        </motion.button>
      </div>

      <div className="note-content">
        <p>{note.content.substring(0, 150)}...</p>
      </div>

      <div className="note-category">
        <span>{getCategoryLabel(note.category)}</span>
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.map((tag, idx) => (
            <span key={idx} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="note-footer">
        <small>{new Date(note.createdAt).toLocaleDateString('vi-VN')}</small>
        <motion.div
          className="note-actions"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            className="action-btn edit-btn"
            onClick={() => onEdit(note)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiEdit2 />
          </motion.button>
          <motion.button
            className="action-btn delete-btn"
            onClick={() => onDelete(note._id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiTrash2 />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
