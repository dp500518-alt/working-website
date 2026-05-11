require('dotenv').config({ path: __dirname + '/.env' });
const { sendEmailNotification } = require('./utils/email');

console.log("Using User:", process.env.EMAIL_USER);
console.log("Using Pass length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

sendEmailNotification({
    name: 'Debug Test',
    email: 'test@example.com',
    phone: '123',
    service: 'Test Service',
    message: 'Test Message'
}).then(() => console.log('Test complete'));
