const Job = require('../models/Job');

// @desc    Fetch all jobs with optional filters
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const {
      search,
      location,
      jobType,
      category,
      remote,
      status,
      moderationStatus,
      recruiterOnly,
    } = req.query;

    let query = {};

    // By default, public users only see Active & Approved jobs
    if (!status && !recruiterOnly) {
      query.status = 'Active';
    } else if (status && status !== 'All') {
      query.status = status;
    }

    if (!moderationStatus && !recruiterOnly) {
      query.moderationStatus = 'Approved';
    } else if (moderationStatus && moderationStatus !== 'All') {
      query.moderationStatus = moderationStatus;
    }

    if (recruiterOnly && req.user) {
      query.postedBy = req.user._id;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: searchRegex },
        { company: searchRegex },
        { description: searchRegex },
        { skills: searchRegex },
      ];
    }

    if (location && location !== 'All') {
      query.location = new RegExp(location, 'i');
    }

    if (jobType && jobType !== 'All') {
      query.jobType = jobType;
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (remote !== undefined && remote !== 'All') {
      query.remote = remote === 'true' || remote === true;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single job by id (MongoDB _id or numeric id)
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const paramId = req.params.id;
    let job;

    if (paramId.match(/^[0-9a-fA-F]{24}$/)) {
      job = await Job.findById(paramId);
    } else if (!isNaN(Number(paramId))) {
      job = await Job.findOne({ id: Number(paramId) });
    }

    if (!job) {
      job = await Job.findOne({ id: paramId });
    }

    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private (Recruiter / Admin)
const createJob = async (req, res) => {
  const {
    title,
    description,
    location,
    salary,
    jobType,
    category,
    skills,
    responsibilities,
    requirements,
    preferredSkills,
    benefits,
    company,
    companyLogo,
    remote,
  } = req.body;

  try {
    const nextNumericId = Date.now();
    const moderationStatus = req.user.role === 'admin' ? 'Approved' : 'Pending Review';

    const job = new Job({
      id: nextNumericId,
      title,
      description,
      location,
      salary: salary || '₹6–10 LPA',
      jobType: jobType || 'Full Time',
      category: category || 'Software Development',
      skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : []),
      responsibilities: responsibilities || [],
      requirements: requirements || [],
      preferredSkills: preferredSkills || [],
      benefits: benefits || ['Health benefits', 'Work from home options'],
      company: company || (req.user.name ? `${req.user.name}'s Tech` : 'Nexora Partner'),
      companyLogo: companyLogo || 'NX',
      remote: remote || false,
      status: 'Active',
      moderationStatus,
      postedBy: req.user._id,
      postedDate: 'Just now',
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private (Owner Recruiter / Admin)
const updateJob = async (req, res) => {
  try {
    const paramId = req.params.id;
    let job = await Job.findOne(
      paramId.match(/^[0-9a-fA-F]{24}$/) ? { _id: paramId } : { id: paramId }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check authorization: admin or owner
    if (req.user.role !== 'admin' && job.postedBy && job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this job' });
    }

    const fieldsToUpdate = [
      'title',
      'description',
      'location',
      'salary',
      'jobType',
      'category',
      'skills',
      'responsibilities',
      'requirements',
      'preferredSkills',
      'benefits',
      'company',
      'companyLogo',
      'remote',
      'status',
      'moderationStatus',
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private (Owner Recruiter / Admin)
const deleteJob = async (req, res) => {
  try {
    const paramId = req.params.id;
    let job = await Job.findOne(
      paramId.match(/^[0-9a-fA-F]{24}$/) ? { _id: paramId } : { id: paramId }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (req.user.role !== 'admin' && job.postedBy && job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.deleteOne({ _id: job._id });
    res.json({ message: 'Job removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin: Update moderation status (Approved / Rejected / Flagged)
// @route   PUT /api/jobs/:id/moderation
// @access  Private (Admin)
const updateJobModeration = async (req, res) => {
  try {
    const paramId = req.params.id;
    const { moderationStatus } = req.body;

    let job = await Job.findOne(
      paramId.match(/^[0-9a-fA-F]{24}$/) ? { _id: paramId } : { id: paramId }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.moderationStatus = moderationStatus;
    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  updateJobModeration,
};
