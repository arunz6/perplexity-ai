import jtw from "jsonwebtoken";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";

async function registercontroller(req, res, next) {
  const { username, email, password } = req.body;

  const isuserpresent = userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!isuserpresent) {
    return res.status(409).json({
      message: "username or email is already present ",
      success:false,
      err:"user already exist  "
    });
  }
  const user = userModel.create({
    username,
    password,
    email
  })
  
}

export default { registercontroller };
