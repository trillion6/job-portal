const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      enum: ['jobseeker', 'recruiter', 'admin'],
      default: 'jobseeker',
    },
    status: {
      type: String,
      enum: ['Active', 'Suspended'],
      default: 'Active',
    },
    title: {
      type: String,
      default: 'Software Developer',
    },
    location: {
      type: String,
      default: 'Chandigarh',
    },
    phone: {
      type: String,
      default: '',
    },
    experience: {
      type: String,
      default: '2 Years',
    },
    education: {
      type: String,
      default: 'MCA',
    },
    skills: {
      type: [String],
      default: ['Python', 'JavaScript', 'React'],
    },
    bio: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    portfolio: {
      type: String,
      default: '',
    },
    savedJobs: {
      type: [String],
      default: [],
    },
    resume: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        personal: {},
        summary: '',
        skills: [],
        education: [],
        experience: [],
        projects: [],
        certifications: [],
        achievements: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
