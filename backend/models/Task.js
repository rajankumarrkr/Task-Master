const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Project',
    },
    title: {
      type: String,
      required: [true, 'Please add a task title'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
