const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getCompanyById,
  getMyCompany,
  updateCompany,
  updateCompanyStatus,
  deleteCompany,
} = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCompanies);

router.route('/my')
  .get(protect, getMyCompany)
  .put(protect, updateCompany);

router.route('/:id')
  .get(getCompanyById)
  .delete(protect, authorize('admin'), deleteCompany);

router.route('/:id/status')
  .put(protect, authorize('admin'), updateCompanyStatus);

module.exports = router;
