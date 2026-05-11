const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const inquiriesRouter = require('./routes/inquiries');
const equipmentRouter = require('./routes/equipment');

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Serve static files (admin panel)
app.use('/admin', express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/equipment', equipmentRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Green Enterprise API is running!',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: '🏗️ Welcome to Green Enterprise Backend API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            inquiries: '/api/inquiries',
            equipment: '/api/equipment',
            admin: '/admin'
        },
        documentation: 'See README.md for API documentation'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start server
app.listen(PORT, () => {
    console.log('\n🚀 ========================================');
    console.log('🏗️  GREEN ENTERPRISE BACKEND SERVER');
    console.log('========================================');
    console.log(`✅ Server running on: http://localhost:${PORT}`);
    console.log(`✅ API endpoint: http://localhost:${PORT}/api`);
    console.log(`✅ Admin panel: http://localhost:${PORT}/admin`);
    console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('========================================\n');
});

module.exports = app;
