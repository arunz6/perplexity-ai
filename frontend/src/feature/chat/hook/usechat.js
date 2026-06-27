import { initalizeSocketconnection } from "../service/chat.soket";
import { useDispatch } from "react-redux";
import {
  chatmessage,
  getchats,
  getmessages,
  deleteChat,
} from "../service/chat.api";
import {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  createNewChat,
  addNewMessage,
  addMessages,
} from "../chat.slice";

export const usechat = () => {
  const dispatch = useDispatch();

  async function handelsandmessage({ umessage, chatId }) {
    dispatch(setLoading(true));
    const data = await chatmessage({ umessage, chatId });
    const { chat, aimessage } = data;
    if (!chatId) {
      dispatch(createNewChat({ chatId: chat._id, title: chat.title }));
    }
    dispatch(
      addNewMessage({
        chatId: chatId || chat._id,
        content: umessage,
        role: "user",
      }),
    );
    (dispatch(
      addNewMessage({
        chatId: chatId || chat._id,
        content: aimessage.content,
        role: aimessage.role,
      }),
    ),
      dispatch(setCurrentChatId(chat._id)));
  }

  

  return { initalizeSocketconnection, handelsandmessage };
};
