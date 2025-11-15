const Feedback = require('../models/Feedback');

// @desc    Add new feedback
// @route   POST /api/feedback
// @access  Public
const addFeedback = async (req, res) => {
    try {
        const { name, email, rating, message } = req.body;
        
        const feedback = new Feedback({
            name,
            email,
            rating,
            message
        });
        
        const savedFeedback = await feedback.save();
        
        res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            data: savedFeedback
        });
    } catch (error) {
        console.error('Error adding feedback:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to submit feedback' 
        });
    }
};

// @desc    Get all feedbacks
// @route   GET /api/feedback
// @access  Public
const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .sort({ createdAt: -1 })
            .lean();
        
        res.status(200).json({
            success: true,
            count: feedbacks.length,
            data: feedbacks
        });
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch feedbacks' 
        });
    }
};

// @desc    Get feedback by ID
// @route   GET /api/feedback/:id
// @access  Public
const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        
        if (!feedback) {
            return res.status(404).json({
                success: false,
                error: 'Feedback not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: feedback
        });
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch feedback' 
        });
    }
};

// @desc    Get feedback statistics
// @route   GET /api/feedback/stats
// @access  Public
const getFeedbackStats = async (req, res) => {
    try {
        // Total count
        const totalFeedbacks = await Feedback.countDocuments();
        
        // Average rating
        const avgResult = await Feedback.aggregate([
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: '$rating' }
                }
            }
        ]);
        
        const averageRating = avgResult.length > 0 
            ? parseFloat(avgResult[0].avgRating) 
            : 0;
        
        // Positive feedbacks (rating >= 4)
        const positiveFeedbacks = await Feedback.countDocuments({ rating: { $gte: 4 } });
        
        // Negative feedbacks (rating < 3)
        const negativeFeedbacks = await Feedback.countDocuments({ rating: { $lt: 3 } });
        
        // Neutral feedbacks (rating == 3)
        const neutralFeedbacks = await Feedback.countDocuments({ rating: 3 });
        
        // Rating distribution
        const ratingDistribution = await Feedback.aggregate([
            {
                $group: {
                    _id: '$rating',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: -1 }
            }
        ]);
        
        res.status(200).json({
            success: true,
            stats: {
                totalFeedbacks,
                averageRating,
                positiveFeedbacks,
                negativeFeedbacks,
                neutralFeedbacks,
                ratingDistribution
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch statistics' 
        });
    }
};

// @desc    Update feedback
// @route   PUT /api/feedback/:id
// @access  Public
const updateFeedback = async (req, res) => {
    try {
        const { name, email, rating, message } = req.body;
        
        const feedback = await Feedback.findById(req.params.id);
        
        if (!feedback) {
            return res.status(404).json({
                success: false,
                error: 'Feedback not found'
            });
        }
        
        feedback.name = name || feedback.name;
        feedback.email = email || feedback.email;
        feedback.rating = rating || feedback.rating;
        feedback.message = message || feedback.message;
        
        const updatedFeedback = await feedback.save();
        
        res.status(200).json({
            success: true,
            message: 'Feedback updated successfully',
            data: updatedFeedback
        });
    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to update feedback' 
        });
    }
};

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Public
const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        
        if (!feedback) {
            return res.status(404).json({
                success: false,
                error: 'Feedback not found'
            });
        }
        
        await feedback.deleteOne();
        
        res.status(200).json({
            success: true,
            message: 'Feedback deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to delete feedback' 
        });
    }
};

module.exports = {
    addFeedback,
    getAllFeedbacks,
    getFeedbackById,
    getFeedbackStats,
    updateFeedback,
    deleteFeedback
};
