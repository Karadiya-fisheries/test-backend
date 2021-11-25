require("dotenv/config");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "7tharindugalle@gmail.com",
    pass: "xsmtpsib-32593d962df22e63a52ab7c3fb2e3bec802eef89472de572d6cbe286e3727ad4-ryz74cRJWLnTQx35",
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
