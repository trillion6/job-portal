const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  updateJobModeration,
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getJobs)
  .post(protect, authorize('recruiter', 'admin'), createJob);

router.route('/:id')
  .get(getJobById)
  .put(protect, authorize('recruiter', 'admin'), updateJob)
  .delete(protect, authorize('recruiter', 'admin'), deleteJob);

router.route('/:id/moderation')
  .put(protect, authorize('admin'), updateJobModeration);

module.exports = router;
