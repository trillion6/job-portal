const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').get(getJobs).post(protect, authorize('recruiter', 'admin'), createJob);
router.route('/:id').get(getJobById);

module.exports = router;
