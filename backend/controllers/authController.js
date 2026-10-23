const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secretkey', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, role, title, location, phone, skills, bio } = req.body;

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'jobseeker',
      title: title || (role === 'recruiter' ? 'Talent Acquisition' : 'Software Developer'),
      location: location || 'Chandigarh',
      phone: phone || '',
      skills: skills || ['Python', 'JavaScript', 'React'],
      bio: bio || '',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        title: user.title,
        location: user.location,
        phone: user.phone,
        experience: user.experience,
        education: user.education,
        skills: user.skills,
        bio: user.bio,
        linkedin: user.linkedin,
        portfolio: user.portfolio,
        savedJobs: user.savedJobs || [],
        resume: user.resume,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
      if (user.status === 'Suspended') {
        return res.status(403).json({ message: 'Your account has been suspended by an administrator.' });
      }

      res.json({
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        title: user.title,
        location: user.location,
        phone: user.phone,
        experience: user.experience,
        education: user.education,
        skills: user.skills,
        bio: user.bio,
        linkedin: user.linkedin,
        portfolio: user.portfolio,
        savedJobs: user.savedJobs || [],
        resume: user.resume,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.title = req.body.title || user.title;
      user.location = req.body.location || user.location;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
      user.experience = req.body.experience || user.experience;
      user.education = req.body.education || user.education;
      user.skills = req.body.skills || user.skills;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
      user.linkedin = req.body.linkedin !== undefined ? req.body.linkedin : user.linkedin;
      user.portfolio = req.body.portfolio !== undefined ? req.body.portfolio : user.portfolio;
      
      if (req.body.resume) {
        user.resume = req.body.resume;
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status,
        title: updatedUser.title,
        location: updatedUser.location,
        phone: updatedUser.phone,
        experience: updatedUser.experience,
        education: updatedUser.education,
        skills: updatedUser.skills,
        bio: updatedUser.bio,
        linkedin: updatedUser.linkedin,
        portfolio: updatedUser.portfolio,
        savedJobs: updatedUser.savedJobs,
        resume: updatedUser.resume,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle saved job for user
// @route   POST /api/auth/saved-jobs/:jobId
// @access  Private
const toggleSavedJob = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const jobId = String(req.params.jobId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const savedIndex = user.savedJobs.indexOf(jobId);
    let isSaved = false;

    if (savedIndex > -1) {
      user.savedJobs.splice(savedIndex, 1);
      isSaved = false;
    } else {
      user.savedJobs.push(jobId);
      isSaved = true;
    }

    await user.save();
    res.json({ savedJobs: user.savedJobs, isSaved, jobId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/auth/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user status / role (Admin only)
// @route   PUT /api/auth/users/:id/status
// @access  Private/Admin
const updateUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.status) user.status = req.body.status;
    if (req.body.role) user.role = req.body.role;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      status: updatedUser.status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  toggleSavedJob,
  getAllUsers,
  updateUserStatus,
  deleteUser,
};
