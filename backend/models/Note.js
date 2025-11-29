const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#fff9e6',
    },
    category: {
      type: String,
      default: 'general',
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
