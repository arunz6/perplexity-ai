import jwt from "jsonwebtoken";
import config from "../config/config.js";

export function authuser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token is not present ",
      sucess: false,
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt_srcret);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "unable to acces token gives problem ",
      sucess: false,
    });
  }
}
