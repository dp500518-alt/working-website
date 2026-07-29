const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security Hardening: Disable x-powered-by header
app.disable('x-powered-by');

// Security Hardening: Configure Helmet HTTP Headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https:"],
            frameAncestors: ["'none'"]
        }
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }
}));

// Additional Security Header Middleware (Permissions-Policy)
app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
    next();
});

// Rate Limiter to prevent DoS & Spam Attacks (Max 10 requests per 15 mins per IP)
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: 'Too many requests from this IP address. Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Helper function for HTML escaping to prevent XSS / HTML injection in emails
function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Restrict payload size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static(path.join(__dirname, '..')));

// Create email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// Validation rules
const contactValidation = [
    body('name').trim().notEmpty().escape().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').optional().trim().escape(),
    body('service').notEmpty().escape().withMessage('Service selection is required'),
    body('message').optional().trim().escape()
];

// Contact form endpoint
app.post('/api/contact', contactLimiter, contactValidation, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    const name = sanitizeInput(req.body.name);
    const email = sanitizeInput(req.body.email);
    const phone = sanitizeInput(req.body.phone);
    const serviceRaw = sanitizeInput(req.body.service);
    const message = sanitizeInput(req.body.message);

    // Format service name
    const serviceNames = {
        'rental': 'Equipment Rental',
        'sales': 'Equipment Purchase',
        'inquiry': 'General Inquiry'
    };
    const serviceName = serviceNames[serviceRaw] || serviceRaw;

    // Create HTML email
    const htmlEmail = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    line-height: 1.6; 
                    color: #333; 
                    max-width: 600px; 
                    margin: 0 auto;
                }
                .header { 
                    background: linear-gradient(135deg, #15803d, #166534); 
                    color: white; 
                    padding: 30px; 
                    text-align: center; 
                    border-radius: 10px 10px 0 0;
                }
                .header h1 { 
                    margin: 0; 
                    font-size: 24px; 
                }
                .content { 
                    background: #f9fafb; 
                    padding: 30px; 
                    border: 1px solid #e5e7eb;
                }
                .info-row { 
                    margin: 15px 0; 
                    padding: 15px; 
                    background: white; 
                    border-left: 4px solid #15803d;
                    border-radius: 4px;
                }
                .label { 
                    font-weight: bold; 
                    color: #15803d; 
                    display: inline-block;
                    width: 120px;
                }
                .value { 
                    color: #374151; 
                }
                .message-box { 
                    background: white; 
                    padding: 20px; 
                    margin: 20px 0;
                    border-radius: 8px;
                    border: 1px solid #e5e7eb;
                }
                .footer { 
                    text-align: center; 
                    padding: 20px; 
                    color: #6b7280; 
                    font-size: 12px;
                }
                .badge {
                    display: inline-block;
                    background: #dcfce7;
                    color: #15803d;
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-weight: 600;
                    font-size: 14px;
                }
                .action-buttons {
                    text-align: center;
                    margin: 25px 0;
                }
                .btn {
                    display: inline-block;
                    padding: 12px 24px;
                    margin: 5px;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: 600;
                    color: white;
                }
                .btn-call { background: #15803d; }
                .btn-email { background: #166534; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🏗️ Green Enterprise</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">New Customer Inquiry</p>
            </div>
            
            <div class="content">
                <h2 style="color: #15803d; margin-top: 0;">📋 Inquiry Details</h2>
                
                <div class="info-row">
                    <span class="label">Name:</span>
                    <span class="value">${name}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Email:</span>
                    <span class="value"><a href="mailto:${email}" style="color: #15803d;">${email}</a></span>
                </div>
                
                <div class="info-row">
                    <span class="label">Phone:</span>
                    <span class="value"><a href="tel:${phone || 'N/A'}" style="color: #15803d;">${phone || 'Not provided'}</a></span>
                </div>
                
                <div class="info-row">
                    <span class="label">Service:</span>
                    <span class="value"><span class="badge">${serviceName}</span></span>
                </div>
                
                ${message ? `
                <div class="message-box">
                    <h3 style="margin-top: 0; color: #374151;">💬 Message:</h3>
                    <p style="margin: 0; color: #6b7280; white-space: pre-wrap;">${message}</p>
                </div>
                ` : ''}
                
                <div class="action-buttons">
                    ${phone ? `<a href="tel:${phone}" class="btn btn-call">📞 Call ${name}</a>` : ''}
                    <a href="mailto:${email}" class="btn btn-email">✉️ Reply via Email</a>
                </div>
            </div>
            
            <div class="footer">
                <p>This inquiry was submitted via your Green Enterprise website.</p>
                <p>Received on ${new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short'
    })}</p>
            </div>
        </body>
        </html>
    `;

    // Create plain text version
    const textEmail = `
NEW CUSTOMER INQUIRY - Green Enterprise
========================================

Customer Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || 'Not provided'}
- Service: ${serviceName}

${message ? `Message:\n${message}` : 'No message provided'}

========================================
Received: ${new Date().toLocaleString()}
    `.trim();

    // Email options
    const mailOptions = {
        from: `"${name}" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: `🔔 New ${serviceName} Inquiry from ${name}`,
        text: textEmail,
        html: htmlEmail
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);

        console.log('✅ Email sent successfully!');
        console.log(`   From: ${name} (${email})`);
        console.log(`   Service: ${serviceName}`);

        res.json({
            success: true,
            message: 'Your message has been sent successfully! We will contact you soon.'
        });
    } catch (error) {
        console.error('❌ Error sending email:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try calling us directly at +233 535 617 346.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Green Enterprise Email Backend is running!',
        timestamp: new Date().toISOString()
    });
});

// API Root endpoint
app.get('/api', (req, res) => {
    res.json({
        message: '🏗️ Green Enterprise Email Backend',
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
    console.log('📧 GREEN ENTERPRISE EMAIL BACKEND');
    console.log('========================================');
    console.log(`✅ Server running on: http://localhost:${PORT}`);
    console.log(`✅ Contact endpoint: POST /api/contact`);
    console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
    console.log(`📧 Emails will be sent to: ${process.env.GMAIL_USER || 'NOT CONFIGURED'}`);
    console.log('========================================\n');
});

module.exports = app;
