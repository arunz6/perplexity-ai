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

  async function handelchats() {
    dispatch(setLoading(true));
    const data = await getchats();
    const { chats } = data;
    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdated: chat.updatedAt,
          };
          return acc;
        }, {}),
      ),
    );
    dispatch(setLoading(false));
  }

  async function handelopenchat(chatId, chats) {
    console.log(chats[chatId]?.messages.length);
    if (chats[chatId]?.messages.length === 0) {
      const data = await getmessages(chatId);
      const { messages } = data;
      const formattedMessages = messages.map((msg) => ({
        content: msg.content,
        role: msg.role,
      }));

      dispatch(
        addMessages({
          chatId,
          messages: formattedMessages,
        }),
      );
    }
    dispatch(setCurrentChatId(chatId));
  }

  return {
    initalizeSocketconnection,
    handelsandmessage,
    handelchats,
    handelopenchat,
  };
};
