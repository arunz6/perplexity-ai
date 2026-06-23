import { Router } from "express";
import authController from "../controller/auth.controller.js";
import {
  registerValidator,
  validate,
  loginValidator,
} from "../validator/auth.validator.js";
import { authuser } from "../middleware/auth.middleware.js";

const authroute = Router();

authroute.post(
  "/register",
  registerValidator,
  authController.registercontroller,
);

authroute.get("/verify-email", authController.verifyemailcontroller);

authroute.post("/login", loginValidator, authController.logincontroller);

authroute.get("/getme", authuser, authController.getmecontroller);

export default authroute;
