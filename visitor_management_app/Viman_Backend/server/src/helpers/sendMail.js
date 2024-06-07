const nodemailer = require('nodemailer');
const { SMTP_MAIL, SMTP_PASSWORD } = process.env;

const sendMail = async (email, mailSubject, content) => {
    try {
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            requireTLS: true,
            auth: {
                user: SMTP_MAIL,
                pass: SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: SMTP_MAIL,
            to: email,
            subject: mailSubject,
            html: content
        };

        const info = await transport.sendMail(mailOptions);
        console.log('Mail sent successfully!', info.response);
        return info.response;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send email");
    }
};

module.exports = sendMail;
