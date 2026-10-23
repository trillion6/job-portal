const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      sparse: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a job title'],
    },
    company: {
      type: String,
      required: [true, 'Please add a company name'],
    },
    companyLogo: {
      type: String,
      default: 'TN',
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    salary: {
      type: String,
      default: '₹6–10 LPA',
    },
    jobType: {
      type: String,
      default: 'Full Time',
    },
    experience: {
      type: String,
      default: '1-3 Years',
    },
    category: {
      type: String,
      default: 'Software Development',
    },
    skills: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    requirements: {
      type: [String],
      default: [],
    },
    preferredSkills: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: ['Health benefits', 'Work from home options', 'Learning allowance'],
    },
    postedDate: {
      type: String,
      default: 'Just now',
    },
    applicants: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    status: {
      type: String,
      enum: ['Active', 'Paused', 'Closed'],
      default: 'Active',
    },
    moderationStatus: {
      type: String,
      enum: ['Approved', 'Pending Review', 'Rejected', 'Flagged'],
      default: 'Approved',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Job', jobSchema);
