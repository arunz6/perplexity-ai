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
  return { initalizeSocketconnection };

  const dispatch = useDispatch();

  async function handelsandmessage({ umessage, chatId }) {
    dispatch(setLoading(true));
    const data = await chatmessage({ umessage, chatId });
    const { chat, aimessage } = data;
    console.log({ chat, aimessage });
    console.log(data);
  }

  return {
    handelsandmessage,
  };


  
};



