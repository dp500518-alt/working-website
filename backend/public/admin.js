// API Base URL
const API_BASE = window.location.origin + '/api';

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadInquiries();
    loadEquipment();
    loadStats();
});

// Switch between tabs
function switchTab(tab) {
    // Update tab active state
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    // Show/hide sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(`${tab}-section`).classList.add('active');
}

// Load statistics
async function loadStats() {
    try {
        const [inquiriesRes, equipmentRes] = await Promise.all([
            fetch(`${API_BASE}/inquiries`),
            fetch(`${API_BASE}/equipment`)
        ]);

        const inquiriesData = await inquiriesRes.json();
        const equipmentData = await equipmentRes.json();

        if (inquiriesData.success) {
            document.getElementById('total-inquiries').textContent = inquiriesData.count;
            const newCount = inquiriesData.inquiries.filter(i => i.status === 'new').length;
            document.getElementById('new-inquiries').textContent = newCount;
        }

        if (equipmentData.success) {
            document.getElementById('total-equipment').textContent = equipmentData.count;
            const availableCount = equipmentData.equipment.filter(e => e.availability === 'available').length;
            document.getElementById('available-equipment').textContent = availableCount;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load inquiries
async function loadInquiries() {
    const container = document.getElementById('inquiries-content');
    container.innerHTML = '<div class="loading">Loading inquiries...</div>';

    try {
        const response = await fetch(`${API_BASE}/inquiries`);
        const data = await response.json();

        if (data.success && data.inquiries.length > 0) {
            container.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Service</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.inquiries.map(inquiry => `
                            <tr>
                                <td>#${inquiry.id}</td>
                                <td><strong>${inquiry.name}</strong></td>
                                <td>${inquiry.email}</td>
                                <td>${inquiry.phone || 'N/A'}</td>
                                <td>${formatService(inquiry.service)}</td>
                                <td><span class="status-badge status-${inquiry.status}">${inquiry.status}</span></td>
                                <td>${formatDate(inquiry.created_at)}</td>
                                <td>
                                    <button class="btn btn-primary" onclick="viewInquiry(${inquiry.id})">View</button>
                                    <button class="btn btn-danger" onclick="deleteInquiry(${inquiry.id})">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            container.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3>No inquiries yet</h3>
                    <p>Customer inquiries will appear here when submitted.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading inquiries:', error);
        container.innerHTML = `
            <div class="empty-state">
                <h3>Error loading inquiries</h3>
                <p>Please make sure the backend server is running.</p>
            </div>
        `;
    }
}

// Load equipment
async function loadEquipment() {
    const container = document.getElementById('equipment-content');
    container.innerHTML = '<div class="loading">Loading equipment...</div>';

    try {
        const response = await fetch(`${API_BASE}/equipment`);
        const data = await response.json();

        if (data.success && data.equipment.length > 0) {
            container.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Weight</th>
                            <th>Power</th>
                            <th>Capacity</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.equipment.map(item => `
                            <tr>
                                <td>#${item.id}</td>
                                <td><strong>${item.brand}</strong></td>
                                <td>${item.model}</td>
                                <td>${item.operating_weight}</td>
                                <td>${item.engine_power}</td>
                                <td>${item.bucket_capacity}</td>
                                <td><span class="status-badge status-${item.availability}">${item.availability}</span></td>
                                <td>
                                    <button class="btn btn-primary" onclick="viewEquipment(${item.id})">View</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            container.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3>No equipment found</h3>
                    <p>Add equipment to your inventory.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading equipment:', error);
        container.innerHTML = `
            <div class="empty-state">
                <h3>Error loading equipment</h3>
                <p>Please make sure the backend server is running.</p>
            </div>
        `;
    }
}

// View inquiry details
async function viewInquiry(id) {
    try {
        const response = await fetch(`${API_BASE}/inquiries/${id}`);
        const data = await response.json();

        if (data.success) {
            const inquiry = data.inquiry;
            alert(`
Inquiry #${inquiry.id}
━━━━━━━━━━━━━━━━━━━━━━━
Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || 'N/A'}
Service: ${formatService(inquiry.service)}
Status: ${inquiry.status}
Date: ${formatDate(inquiry.created_at)}

Message:
${inquiry.message || 'No message provided'}
            `.trim());
        }
    } catch (error) {
        console.error('Error viewing inquiry:', error);
        alert('Error loading inquiry details');
    }
}

// Delete inquiry
async function deleteInquiry(id) {
    if (!confirm('Are you sure you want to delete this inquiry?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/inquiries/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();

        if (data.success) {
            alert('Inquiry deleted successfully!');
            loadInquiries();
            loadStats();
        } else {
            alert('Error deleting inquiry');
        }
    } catch (error) {
        console.error('Error deleting inquiry:', error);
        alert('Error deleting inquiry');
    }
}

// View equipment details
async function viewEquipment(id) {
    try {
        const response = await fetch(`${API_BASE}/equipment/${id}`);
        const data = await response.json();

        if (data.success) {
            const eq = data.equipment;
            alert(`
Equipment #${eq.id}
━━━━━━━━━━━━━━━━━━━━━━━
Brand: ${eq.brand}
Model: ${eq.model}
Operating Weight: ${eq.operating_weight}
Engine Power: ${eq.engine_power}
Bucket Capacity: ${eq.bucket_capacity}
Availability: ${eq.availability}

Description:
${eq.description}
            `.trim());
        }
    } catch (error) {
        console.error('Error viewing equipment:', error);
        alert('Error loading equipment details');
    }
}

// Helper functions
function formatService(service) {
    const services = {
        'rental': 'Equipment Rental',
        'sales': 'Equipment Purchase',
        'inquiry': 'General Inquiry'
    };
    return services[service] || service;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
