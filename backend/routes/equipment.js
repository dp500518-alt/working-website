const express = require('express');
const router = express.Router();

// GET - Fetch all equipment
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: 3,
        equipment: [
            { id: 1, brand: 'Sany', model: 'SY250', operating_weight: '25 tons', engine_power: '140 kW', bucket_capacity: '1.2 m³', description: 'Powerful and efficient 25-ton excavator', availability: 'available' },
            { id: 2, brand: 'Hyundai', model: 'HX250L', operating_weight: '25 tons', engine_power: '138 kW', bucket_capacity: '1.15 m³', description: 'Reliable Korean engineering', availability: 'available' },
            { id: 3, brand: 'XCMG', model: 'XE250D', operating_weight: '25 tons', engine_power: '135 kW', bucket_capacity: '1.18 m³', description: 'Cutting-edge technology combined with robust construction', availability: 'available' }
        ]
    });
});

module.exports = router;
