const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const db = new Database(path.join(__dirname, 'greenenterprise.db'));

// Create tables
function initializeDatabase() {
    // Contact inquiries table
    db.exec(`
        CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            service TEXT NOT NULL,
            message TEXT,
            status TEXT DEFAULT 'new',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Equipment table
    db.exec(`
        CREATE TABLE IF NOT EXISTS equipment (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            brand TEXT NOT NULL,
            model TEXT NOT NULL,
            operating_weight TEXT,
            engine_power TEXT,
            bucket_capacity TEXT,
            description TEXT,
            availability TEXT DEFAULT 'available',
            image_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Admin users table
    db.exec(`
        CREATE TABLE IF NOT EXISTS admin_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            email TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Insert default equipment
    const equipmentCount = db.prepare('SELECT COUNT(*) as count FROM equipment').get();
    if (equipmentCount.count === 0) {
        const insertEquipment = db.prepare(`
            INSERT INTO equipment (brand, model, operating_weight, engine_power, bucket_capacity, description, availability, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);

        insertEquipment.run('Sany', 'SY250', '25 tons', '140 kW', '1.2 m³',
            'Powerful and efficient 25-ton excavator with advanced hydraulic system and exceptional fuel economy.',
            'available', 'sany-excavator.jpg');

        insertEquipment.run('Hyundai', 'HX250L', '25 tons', '138 kW', '1.15 m³',
            'Reliable Korean engineering with superior durability and low maintenance costs for demanding projects.',
            'available', 'hyundai-excavator.jpg');

        insertEquipment.run('XCMG', 'XE250D', '25 tons', '135 kW', '1.18 m³',
            'Cutting-edge technology combined with robust construction for maximum productivity in tough conditions.',
            'available', 'xcmg-excavator.jpg');
    }

    console.log('✅ Database initialized successfully!');
}

// Initialize on module load
initializeDatabase();

module.exports = db;
