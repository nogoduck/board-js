const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema(
  {
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Board = mongoose.model('Board', BoardSchema);

module.exports = { Board };
