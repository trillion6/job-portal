const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a job title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    salary: {
      type: String,
    },
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      default: 'Full-time',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Job', jobSchema);
