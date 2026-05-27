import { Router } from "express";
import authController from "../controller/auth.controller.js";
const authroute = Router();


authroute.post("/register",authController.registercontroller)












export default authroute