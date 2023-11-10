const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = (email, msg) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.NODEMAILER_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },  
  });

  let message = { 
    from: "Smart Bin App",
    to: email,
    subject: "Peringatan Kondisi Tempat Sampah", 
    text: msg,
  }

  transporter.sendMail(message)
};

module.exports = { sendEmail };