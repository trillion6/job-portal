const Application = require('../models/Application');
const Job = require('../models/Job');
const Notification = require('../models/Notification');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Jobseeker)
const createApplication = async (req, res) => {
  const {
    jobId,
    jobTitle,
    company,
    name,
    email,
    phone,
    experience,
    portfolio,
    linkedin,
    coverLetter,
    resume,
  } = req.body;

  try {
    // Check if user already applied
    const existingApp = await Application.findOne({
      applicant: req.user._id,
      jobId: String(jobId),
    });

    if (existingApp) {
      return res.status(400).json({ message: 'You have already applied for this position' });
    }

    // Try finding the job to link ObjectId
    let jobDoc = await Job.findOne(
      String(jobId).match(/^[0-9a-fA-F]{24}$/) ? { _id: jobId } : { id: Number(jobId) || jobId }
    );

    const application = new Application({
      job: jobDoc ? jobDoc._id : undefined,
      jobId: String(jobId),
      jobTitle: jobTitle || (jobDoc ? jobDoc.title : 'Job Opportunity'),
      company: company || (jobDoc ? jobDoc.company : 'Company'),
      applicant: req.user._id,
      name: name || req.user.name,
      email: email || req.user.email,
      phone: phone || req.user.phone || '',
      experience: experience || req.user.experience || '',
      portfolio: portfolio || req.user.portfolio || '',
      linkedin: linkedin || req.user.linkedin || '',
      coverLetter: coverLetter || '',
      resume: resume || req.user.resume,
      status: 'Applied',
      appliedDate: new Date().toLocaleDateString(),
    });

    const savedApp = await application.save();

    // Increment applicants counter on job
    if (jobDoc) {
      jobDoc.applicants = (jobDoc.applicants || 0) + 1;
      await jobDoc.save();
    }

    // Create notification for seeker
    await Notification.create({
      user: req.user._id,
      title: 'Application Submitted',
      message: `Your application for ${application.jobTitle} at ${application.company} was submitted successfully.`,
      type: 'application',
      date: 'Just now',
    });

    res.status(201).json(savedApp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user applications
// @route   GET /api/applications/my
// @access  Private (Jobseeker)
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id }).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recruiter applicants
// @route   GET /api/applications/recruiter
// @access  Private (Recruiter / Admin)
const getRecruiterApplications = async (req, res) => {
  try {
    // Find jobs posted by this recruiter
    const recruiterJobs = await Job.find({ postedBy: req.user._id });
    const jobIds = recruiterJobs.map(j => String(j.id || j._id));
    const jobObjectIds = recruiterJobs.map(j => j._id);

    let query = {};
    if (req.user.role === 'admin') {
      // Admins see all
      query = {};
    } else {
      query = {
        $or: [
          { job: { $in: jobObjectIds } },
          { jobId: { $in: jobIds } },
          { company: req.user.company || 'TechNova' }
        ]
      };
    }

    const applications = await Application.find(query).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all applications (Admin)
// @route   GET /api/applications/admin
// @access  Private (Admin)
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find({}).populate('applicant', 'name email').sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status (Recruiter / Admin)
// @route   PUT /api/applications/:id/status
// @access  Private (Recruiter / Admin)
const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    const updatedApp = await application.save();

    // Create notification for applicant
    let notifMessage = `Your application status for ${application.jobTitle} has been updated to ${status}.`;
    if (status === 'Shortlisted') notifMessage = `Congratulations! Your application for ${application.jobTitle} at ${application.company} has been shortlisted.`;
    if (status === 'Interview') notifMessage = `Great news! You have been scheduled for an interview for ${application.jobTitle} at ${application.company}.`;
    if (status === 'Selected') notifMessage = `Congratulations! You have been selected for ${application.jobTitle} at ${application.company}!`;

    await Notification.create({
      user: application.applicant,
      title: `Application: ${status}`,
      message: notifMessage,
      type: 'application',
      date: 'Just now',
    });

    res.json(updatedApp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createApplication,
  getMyApplications,
  getRecruiterApplications,
  getAllApplications,
  updateApplicationStatus,
};
