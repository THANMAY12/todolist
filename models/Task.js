const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is absolutely required. Do not leave it blank.'],
    trim: true,
    minlength: [3, 'Provide a meaningful title (at least 3 characters)'],
    maxlength: [100, 'Title is too long. Please keep it under 100 characters.']
  },
  description: {
    type: String,
    required: [true, 'Task description is required to provide context.'],
    trim: true,
    maxlength: [500, 'Description is too long. Please keep it under 500 characters.']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'completed'],
      message: '"{VALUE}" is an invalid status. Choose pending, in-progress, or completed.'
    },
    default: 'pending'
  }
}, { timestamps: true });

// Pre-save hook to automatically capitalize the title and ensure it's trimmed
taskSchema.pre('save', function(next) {
  if (this.isModified('title') && this.title) {
    this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
