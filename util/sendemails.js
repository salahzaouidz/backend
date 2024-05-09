const nodemailer = require('nodemailer');
 
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
      user: 'medsecuredzcontact@gmail.com', 
      pass: 'bjyz cjvu emwj bnbc' 
    }
  });
  
  module.exports = transporter;
