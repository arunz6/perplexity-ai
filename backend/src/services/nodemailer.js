import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: config.Google_user,
    clientId: config.Client_ID,
    clientSecret: config.Client_Secret,
    refreshToken: config.Refresh_token,
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


export async function sendemail({to, subject, text, html}) {
   const mailOptions = {
    from: `"MyApp" <${config.Google_user}>`,
    to,
    subject,
    html,
  };
  const details = await transporter.sendMail(mailOptions)
  console.log("email send " , details)
}