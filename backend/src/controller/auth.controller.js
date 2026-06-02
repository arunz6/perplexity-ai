import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import { sendemail } from "../services/nodemailer.js";
import config from "../config/config.js";
import mongoose, { mongo } from "mongoose";

async function registercontroller(req, res, next) {
  const { username, email, password } = req.body;

  const isuserpresent = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isuserpresent) {
    return res.status(409).json({
      message: "username or email is already present ",
      success: false,
      err: "user already exist  ",
    });
  }
  const user = await userModel.create({
    username,
    password,
    email,
  });
  const vrifyemailtoken = jwt.sign(
    {
      email: email,
    },
    config.jwt_srcret,
  );

  await sendemail({
    to: email,
    subject: "Welcome to Perplexity!",
    html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:5000/api/auth/verify-email?token=${vrifyemailtoken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `,
  });

  res.status(201).json({
    mssage: "mail send ",
  });
}

async function verifyemailcontroller(req, res, next) {
  const { token } = req.query;

  if (!token) {
    res.status(401).json({
      mssage: "token is not present ",
    });
  }

  const decoded = jwt.verify(token, config.jwt_srcret);

  const user = await userModel.findOne({
    email: decoded.email,
  });

  user.verified = true;

  await user.save();

  res.status(201).json({
    message: "email verifed",
  });
}


async function logincontroller (req,res,next) {
  const {email, password, username} = req.body;
  
  const user = await userModel.findOne({email})

  if(!user){
    res.status(401).json({
      message:"user or pass is not present "
    })
  }

  if(user.verified==false){
    res.status(401)({
      message:" user is not verified "
    })
  }
  const isPasswordMatch = await bcrypt.compare(password,user.password)

  if(!isPasswordMatch){
    res.status(402).json({
       message:" password is in correct  "
    })
  }
  
  const token =  jwt.sign({id:user._id},config.jwt_srcret,{
    expiresIn:"3d"
  })


  res.cookie("token",token)

  res.status(201).json({
    message:"login done "
  })

}



async function getmecontroller(req,res,next) {

  
}




export default { registercontroller, verifyemailcontroller ,logincontroller ,getmecontroller };
