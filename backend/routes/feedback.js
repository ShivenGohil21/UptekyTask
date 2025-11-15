const express = require('express');
const router = express.Router();
const { 
    addFeedback, 
    getAllFeedbacks, 
    getFeedbackById, 
    getFeedbackStats,
    updateFeedback,
    deleteFeedback 
} = require('../controllers/feedbackController');
const { validateFeedback } = require('../validators/feedbackValidator');

// @route   GET /api/feedback/stats
// @desc    Get feedback statistics
// @access  Public
router.get('/stats', getFeedbackStats);

// @route   POST /api/feedback
// @desc    Add new feedback
// @access  Public
router.post('/', validateFeedback, addFeedback);

// @route   GET /api/feedback
// @desc    Get all feedbacks
// @access  Public
router.get('/', getAllFeedbacks);

// @route   GET /api/feedback/:id
// @desc    Get feedback by ID
// @access  Public
router.get('/:id', getFeedbackById);

// @route   PUT /api/feedback/:id
// @desc    Update feedback
// @access  Public
router.put('/:id', validateFeedback, updateFeedback);

// @route   DELETE /api/feedback/:id
// @desc    Delete feedback
// @access  Public
router.delete('/:id', deleteFeedback);

module.exports = router;
