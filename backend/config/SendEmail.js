const nodemailer = require('nodemailer');
require("dotenv").config();

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Replace with Hostinger's SMTP server
    port: process.env.EMAIL_PORT, // For SSL (use 587 for TLS)
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_ACCOUNT, // Your email
        pass: process.env.EMAIL_PASSWORD  // Your email password
    }
});

let messageHtml = (subject, msg) => {
    return `
            <div style="font-size: 13px; font-family: Calibri; width: 100%; margin: auto; padding: auto;">
                <div style='width: 100%; padding: auto; margin: auto; text-align: center'>
                    <img src="${process.env.SST_LOGO}" style="margin: auto; min-height: 10px; max-height:90px; min-width:10px; max-width:90px">
                    <br/><b style="font-size: 16px;">${process.env.APP_NAME}</b><br/>
                    <b style='font-size: 14px;'>${subject}</b><br/>
                </div>
                <br/><div>${msg}</div><br/>
                <div style="text-align: center; width: 100%; height: 20px; padding: auto; background-color: #212121; color: white">
                    &copy; ${new Date().toLocaleString()}
                </div>
            </div>`;
};

async function sendConfirmationEmail(userEmail, confirmationToken) {
    const confirmationUrl = `https://102.214.45.169/auth/verify-email?token=${confirmationToken}`;
    const subject = 'Confirm your Email';
    let mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to: userEmail,
        subject: subject,
        html: messageHtml(subject, `<p>Please confirm your email by clicking on the following link: <a href="${confirmationUrl}">Confirm Email</a></p>`)
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending confirmation email:', error);
        } else {
            console.log('Confirmation email sent:', info.response);
        }
    });
}

module.exports = {sendConfirmationEmail}