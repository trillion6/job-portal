const express = require('express');
const router = express.Router();
const {
  createApplication,
  getMyApplications,
  getRecruiterApplications,
  getAllApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createApplication);

router.route('/my')
  .get(protect, getMyApplications);

router.route('/recruiter')
  .get(protect, authorize('recruiter', 'admin'), getRecruiterApplications);

router.route('/admin')
  .get(protect, authorize('admin'), getAllApplications);

router.route('/:id/status')
  .put(protect, authorize('recruiter', 'admin'), updateApplicationStatus);

module.exports = router;
