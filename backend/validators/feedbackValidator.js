const validateFeedback = (req, res, next) => {
    const { name, email, rating, message } = req.body;
    
    // Validation rules
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required' });
    }
    
    if (!email || email.trim() === '') {
        return res.status(400).json({ error: 'Email is required' });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    
    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    if (!message || message.trim() === '') {
        return res.status(400).json({ error: 'Message is required' });
    }
    
    next();
};

module.exports = { validateFeedback };
