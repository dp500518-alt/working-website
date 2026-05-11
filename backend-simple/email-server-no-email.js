const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Validation rules
const contactValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').optional().trim(),
    body('service').notEmpty().withMessage('Service selection is required'),
    body('message').optional().trim()
];

// Contact form endpoint (WITHOUT EMAIL - for testing only)
app.post('/api/contact', contactValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    const { name, email, phone, service, message } = req.body;

    // Format service name
    const serviceNames = {
        'rental': 'Equipment Rental',
        'sales': 'Equipment Purchase',
        'inquiry': 'General Inquiry'
    };
    const serviceName = serviceNames[service] || service;

    // Just log the inquiry (NO EMAIL SENT)
    console.log('\n✅ ========================================');
    console.log('📋 NEW INQUIRY RECEIVED (Email disabled)');
    console.log('========================================');
    console.log(`👤 Name: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`📱 Phone: ${phone || 'Not provided'}`);
    console.log(`🏗️  Service: ${serviceName}`);
    console.log(`💬 Message: ${message || 'No message'}`);
    console.log('========================================\n');

    // Return success (even though no email was sent)
    res.json({
        success: true,
        message: 'Your message has been received! We will contact you soon.'
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Green Enterprise Email Backend is running! (Email sending disabled)',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: '🏗️ Green Enterprise Backend (Testing Mode - No Emails)',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            contact: 'POST /api/contact',
            health: 'GET /api/health'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('\n🚀 ========================================');
    console.log('🧪 GREEN ENTERPRISE BACKEND (TESTING MODE)');
    console.log('========================================');
    console.log(`✅ Server running on: http://localhost:${PORT}`);
    console.log(`✅ Contact endpoint: POST /api/contact`);
    console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
    console.log(`⚠️  EMAIL SENDING: DISABLED (Testing only)`);
    console.log(`ℹ️  Inquiries will be logged to console`);
    console.log('========================================\n');
});

module.exports = app;
