import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const chatmessage = async ({ umessage, chat }) => {
  const response = await api.post("/api/chat/message", { umessage, chat });
  return response.data;
};

const getchats = async () => {
  const response = await api.get("/api/chat");
  return response.data;
};

const getmessages = async (chatId) => {
  const response = await api.get(`/api/chat/${chatId}/messages`);
  return response.data;
};

const deleteChat = async (chatId) => {
  const response = await api.get(`api/chat/delete/${chatId}`);
  return response.data;
};

export { chatmessage, getchats, getmessages, deleteChat };
