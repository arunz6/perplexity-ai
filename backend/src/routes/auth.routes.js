import { Router } from "express";
import authController from "../controller/auth.controller.js";
import {
  registerValidator,
  validate,
  loginValidator,
} from "../validator/auth.validator.js";
const authroute = Router();

// http://localhost:3000/api/auth/register
authroute.post(
  "/register",
  registerValidator,
  authController.registercontroller,
);

authroute.get("/verify-email", authController.verifyemailcontroller);

authroute.post("/login", loginValidator, authController.logincontroller);

authroute.get("/getme", authController.getmecontroller);

export default authroute;
