const Note = require('../models/Note');

// Get all notes (excluding deleted ones)
exports.getNotes = async (req, res) => {
  try {
    const { category, search, sort = 'createdAt' } = req.query;
    let query = { deleted: false };

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOptions = {};
    if (sort === 'createdAt') {
      sortOptions = { createdAt: -1 };
    } else if (sort === 'updated') {
      sortOptions = { updatedAt: -1 };
    } else if (sort === 'title') {
      sortOptions = { title: 1 };
    }

    const notes = await Note.find(query).sort(sortOptions);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get deleted notes (for trash)
exports.getDeletedNotes = async (req, res) => {
  try {
    const notes = await Note.find({ deleted: true }).sort({ deletedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create note
exports.createNote = async (req, res) => {
  try {
    const { title, content, color, category, tags } = req.body;

    const note = new Note({
      title,
      content,
      color,
      category,
      tags,
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get note by ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update note
exports.updateNote = async (req, res) => {
  try {
    const { title, content, color, category, tags, pinned } = req.body;

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, color, category, tags, pinned },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Soft delete note (move to trash)
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { deleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note moved to trash' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Restore note from trash
exports.restoreNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { deleted: false, deletedAt: null },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note restored successfully', note });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Permanently delete note
exports.permanentlyDeleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Pin/Unpin note
exports.togglePin = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.pinned = !note.pinned;
    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
