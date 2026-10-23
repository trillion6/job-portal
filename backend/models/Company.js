const mongoose = require('mongoose');

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a company name'],
      unique: true,
    },
    logo: {
      type: String,
      default: 'CO',
    },
    industry: {
      type: String,
      default: 'Technology',
    },
    size: {
      type: String,
      default: '51-200',
    },
    location: {
      type: String,
      default: 'Chandigarh',
    },
    website: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: 'Building modern digital products and solutions.',
    },
    founded: {
      type: String,
      default: '2020',
    },
    linkedin: {
      type: String,
      default: '',
    },
    benefits: {
      type: [String],
      default: ['Health Insurance', 'Remote Work Options', 'Flexible Hours'],
    },
    culture: {
      type: String,
      default: 'We value innovation, transparency, and a strong work-life balance.',
    },
    status: {
      type: String,
      enum: ['Approved', 'Pending', 'Rejected'],
      default: 'Approved',
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Company', companySchema);
