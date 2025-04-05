const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure environment variables are loaded

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL, // Use environment variable for email
        pass: process.env.EMAIL_PASSWORD, // Use environment variable for password
    },
});
 
const sendEmail = async ({ to, subject, html, attachments }) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL, // Sender email from environment variable
            to: to,
            subject: subject,
            html: html,
            attachments: attachments,
        };

        const response = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", response);
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;
