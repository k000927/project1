const nodemailer = require("nodemailer");

const transPort = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.nodemailer_user,
    pass: process.env.nodemailer_pass,
  },
});

module.exports = transPort;
