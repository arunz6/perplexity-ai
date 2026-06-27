import { genrateresponse, genratetitleofchat } from "../services/ai.service.js";
import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";

async function chatmessage(req, res, next) {
  const { umessage, chat: chatId } = req.body;

  let title = null,
    chat = null;
  if (!chatId) {
    title = await genratetitleofchat(umessage);
    chat = await chatModel.create({
      user: req.user.id,
      title,
    });
  }

  const usermessage = await messageModel.create({
    chat: chatId || chat._id,
    content: umessage,
    role: "user",
  });

  const messages = await messageModel.find({ chat: chatId || chat._id });
  console.log(messages);
  const result = await genrateresponse(messages);

  const aimessage = await messageModel.create({
    chat: chatId || chat._id,
    content: result,
    role: "ai",
  });

  return res.status(201).json({
    title,
    chat,
    aimessage,
  });
}

async function getchats(req, res, next) {
  const user = req.user;

  const chats = await chatModel.find({ user: user.id }).sort({ createdAt: -1 });

  return res.status(200).json({
    message: "chat resived ",
    sucess: true,
    chats,
  });
}

async function getmessages(req, res, next) {
  const { chatId } = req.params;

  const chat = await chatModel.find({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    return res.status(404).json({
      messsage: "chat not found",
    });
  }

  const messages = await messageModel.find({
    chat: chatId,
  });

  return res.status(200).json({
    message: "messages fached done",
    messages,
  });
}



export async function deleteChat(req, res) {

    const { chatId } = req.params;

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    res.status(200).json({
        message: "Chat deleted successfully"
    })
}
  
export default { chatmessage, getchats, getmessages, deleteChat };
