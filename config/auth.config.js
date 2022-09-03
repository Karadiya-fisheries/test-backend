require("dotenv/config");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "7tharindugalle@gmail.com",
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  secret: "secret-key",
  email_secret: "email-confirm-key",
  transporter: transporter,
};
