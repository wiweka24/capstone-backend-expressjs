const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = (email, msg) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.NEXT_PUBLIC_NODEMAILER_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS,
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