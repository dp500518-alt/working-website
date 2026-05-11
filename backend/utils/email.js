const nodemailer = require('nodemailer');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

// Create email transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send email notification for new inquiry
async function sendEmailNotification(inquiryData) {
    // Skip email if credentials not configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('⚠️  Email credentials not configured. Skipping email notification.');
        return;
    }

    try {
        const transporter = createTransporter();

        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER,
            subject: `🔔 New Inquiry from ${inquiryData.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                    <div style="background: linear-gradient(135deg, #15803d, #166534); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">🏗️ Green Enterprise</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">New Customer Inquiry</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="color: #15803d; margin-top: 0;">Customer Details</h2>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;"><strong>Name:</strong></td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${inquiryData.name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;"><strong>Email:</strong></td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${inquiryData.email}" style="color: #15803d;">${inquiryData.email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;"><strong>Phone:</strong></td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;"><a href="tel:${inquiryData.phone}" style="color: #15803d;">${inquiryData.phone}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;"><strong>Service:</strong></td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;"><span style="background: #dcfce7; color: #15803d; padding: 4px 12px; border-radius: 12px; font-size: 14px;">${inquiryData.service}</span></td>
                            </tr>
                        </table>
                        
                        <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-left: 4px solid #15803d; border-radius: 4px;">
                            <h3 style="margin: 0 0 10px 0; color: #374151; font-size: 16px;">Message:</h3>
                            <p style="margin: 0; color: #6b7280; line-height: 1.6;">${inquiryData.message}</p>
                        </div>
                        
                        <div style="margin-top: 30px; text-align: center;">
                            <a href="tel:${inquiryData.phone}" style="display: inline-block; background: #15803d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 5px;">📞 Call Customer</a>
                            <a href="mailto:${inquiryData.email}" style="display: inline-block; background: #166534; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 5px;">✉️ Send Email</a>
                        </div>
                    </div>
                </div>
            `
        };

        const clientMailOptions = {
            from: `"Green Enterprise" <${process.env.EMAIL_USER}>`,
            to: inquiryData.email,
            subject: `Thank you for contacting Green Enterprise`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #166534; border-bottom: 2px solid #166534; padding-bottom: 10px;">Thank You, ${inquiryData.name}!</h2>
                    <p>We have received your message regarding <strong>${inquiryData.service}</strong>.</p>
                    <p>Our team will review your inquiry and get back to you shortly.</p>
                    <br>
                    <p><strong>Your Message:</strong></p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #166534; border-radius: 4px; margin: 10px 0;">
                        <p style="white-space: pre-wrap; margin: 0;">${inquiryData.message}</p>
                    </div>
                    <br>
                    <p>Best regards,<br><strong>Green Enterprise Team</strong></p>
                </div>
            `
        };

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(clientMailOptions);
        console.log('✅ Email notifications sent successfully to admin and client!');
    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        // Don't throw error - we don't want to fail the inquiry submission if email fails
    }
}

module.exports = { sendEmailNotification };
