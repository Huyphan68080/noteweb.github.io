import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import './NoteForm.css';

export default function NoteForm({ note, onSubmit, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
      setTags(note.tags.join(', '));
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      category,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t),
    });
  };

  return (
    <motion.div
      className="note-form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="form-header">
        <h2>{note ? 'Edit Note' : 'New Note'}</h2>
        <motion.button
          className="close-btn"
          onClick={onClose}
          whileHover={{ rotate: 90 }}
        >
          <FiX />
        </motion.button>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            placeholder="Enter note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="general">General</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="idea">Idea</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              id="tags"
              type="text"
              placeholder="Separate tags with commas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          <motion.button
            type="button"
            className="btn-cancel"
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="btn-save"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {note ? 'Update Note' : 'Save Note'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
