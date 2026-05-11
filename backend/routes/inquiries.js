const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { sendEmailNotification } = require('../utils/email');

// Validation rules
const inquiryValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').optional().trim(),
    body('service').notEmpty().withMessage('Service selection is required'),
    body('message').optional().trim()
];

// POST - Submit new inquiry
router.post('/', inquiryValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, service, message } = req.body;

    try {
        // Send email notification (Database logic removed to fix Windows build errors)
        await sendEmailNotification({
            name,
            email,
            phone: phone || 'Not provided',
            service,
            message: message || 'No message provided'
        });

        res.status(201).json({
            success: true,
            message: 'Inquiry submitted successfully!'
        });
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit inquiry. Please try again.'
        });
    }
});

// GET - Fetch all inquiries (Mocked)
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: 0,
        inquiries: []
    });
});

module.exports = router;

