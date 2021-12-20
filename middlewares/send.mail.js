require("dotenv").config();
// const { path } = require("dotenv/lib/env-options");
const path = require("path")
var nodemailer = (require)('nodemailer');

const sendMail = (mailOpt) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_NAME,
      pass: process.env.PASS
    }
  });
 
  console.log(process.env.USER_NAME + ' ' + process.env.PASS);

  transporter.sendMail(mailOpt, function(err, info){
    if(err){
      return console.log(err);
    }else{
      return console.log('email sent: ' + info.response)
    }
  });
}

module.exports = sendMail;