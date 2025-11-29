const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, noteController.getNotes);
router.get('/trash/all', authMiddleware, noteController.getDeletedNotes);
router.post('/', authMiddleware, noteController.createNote);
router.get('/:id', authMiddleware, noteController.getNoteById);
router.put('/:id', authMiddleware, noteController.updateNote);
router.delete('/:id', authMiddleware, noteController.deleteNote);
router.patch('/:id/restore', authMiddleware, noteController.restoreNote);
router.delete('/:id/permanent', authMiddleware, noteController.permanentlyDeleteNote);
router.patch('/:id/pin', authMiddleware, noteController.togglePin);

module.exports = router;
