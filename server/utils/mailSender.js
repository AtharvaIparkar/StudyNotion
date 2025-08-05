const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Allows self-signed certs
            }
        });

        let info = await transporter.sendMail({
            from: 'StudyNotion || CodeHelp - by Babber',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log(info);
        console.log(body);
        return info;
    } catch (error) {
        console.log( error.message);
    }
};

module.exports = mailSender;
