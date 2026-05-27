import jtw from "jsonwebtoken";
import userModel from "../model/user.model.js";
import { registerValidator , validate , loginValidator } from "../validator/auth.validator.js";
import { sendemail } from "../services/nodemailer.js";

async function registercontroller(req, res, next) {
  const { username, email, password } = req.body;

  const isuserpresent = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isuserpresent) {
    return res.status(409).json({
      message: "username or email is already present ",
      success:false,
      err:"user already exist  "
    });
  }
  const user = await userModel.create({
    username,
    password,
    email
  })


  await sendemail({
     to: email,
        subject: "Welcome to Perplexity!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
  })

  res.status(201).json({
    mssage:"mail send "
  })
  
}

export default { registercontroller };
