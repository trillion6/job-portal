const Company = require('../models/Company');
const Job = require('../models/Job');

// @desc    Get all companies (public gets Approved, admin gets all)
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
  try {
    let query = {};
    if (!req.query.all) {
      query.status = 'Approved';
    }

    const companies = await Company.find(query).sort({ name: 1 });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single company by ID or name
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
  try {
    const param = req.params.id;
    let company;

    if (param.match(/^[0-9a-fA-F]{24}$/)) {
      company = await Company.findById(param);
    } else {
      company = await Company.findOne({
        $or: [
          { name: new RegExp(`^${param}$`, 'i') },
          { name: new RegExp(param, 'i') }
        ]
      });
    }

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Also fetch active jobs for this company
    const jobs = await Job.find({
      company: company.name,
      status: 'Active',
      moderationStatus: 'Approved',
    });

    res.json({
      ...company.toObject(),
      activeJobs: jobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get or create company for current recruiter
// @route   GET /api/companies/my
// @access  Private (Recruiter)
const getMyCompany = async (req, res) => {
  try {
    let company = await Company.findOne({ recruiter: req.user._id });

    if (!company) {
      // Find default or create one
      company = await Company.findOne({ name: 'TechNova' });
      if (!company) {
        company = await Company.create({
          name: 'TechNova',
          logo: 'TN',
          industry: 'Software Development',
          size: '51-200',
          location: 'Chandigarh',
          website: 'https://technova.example.com',
          email: 'careers@technova.example',
          phone: '123-456-7890',
          description: 'Building intelligent software solutions for the future.',
          founded: '2018',
          status: 'Approved',
          recruiter: req.user._id,
        });
      }
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update company profile
// @route   PUT /api/companies/my
// @access  Private (Recruiter / Admin)
const updateCompany = async (req, res) => {
  try {
    let company = await Company.findOne({ recruiter: req.user._id });

    if (!company) {
      company = await Company.findOne({ name: req.body.name || 'TechNova' });
    }

    if (!company) {
      company = new Company({
        recruiter: req.user._id,
        ...req.body,
      });
    } else {
      Object.assign(company, req.body);
    }

    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update company status (Admin)
// @route   PUT /api/companies/:id/status
// @access  Private (Admin)
const updateCompanyStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    company.status = status;
    const updated = await company.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete company (Admin)
// @route   DELETE /api/companies/:id
// @access  Private (Admin)
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: 'Company removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
  getMyCompany,
  updateCompany,
  updateCompanyStatus,
  deleteCompany,
};
