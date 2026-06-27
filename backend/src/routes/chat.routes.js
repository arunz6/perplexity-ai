import { Router } from "express";
import { authuser } from "../middleware/auth.middleware.js";
import chatController from "../controller/chat.controller.js";

const chatrouter = Router();

chatrouter.post("/message", authuser, chatController.chatmessage);

chatrouter.get("/", authuser, chatController.getchats);

chatrouter.get("/:chatId/messages", authuser, chatController.getmessages);

chatrouter.delete("/delete/:chatId", authuser, chatController.deleteChat);

export default chatrouter;
