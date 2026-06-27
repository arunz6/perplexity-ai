import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import config from "../config/config.js";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { AIMessage } from "@langchain/core/messages";

// ✅ Yeh try karo — abhi bhi free hai
const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  apiKey: config.ai_api_key,
});

const mistralmodel = new ChatMistralAI({
  apiKey: config.mistralapi,
  model: "mistral-large-latest",
});

export async function genrateresponse(messages) {
  const response = await mistralmodel.invoke(
    messages.map((msg) => {
      if (msg.role == "user") {
        return new HumanMessage(msg.content);
      } else if (msg.role == "ai") {
        return new AIMessage(msg.content);
      }
    }),
  );

  return response.text;
}

export async function genratetitleofchat(message) {
  const response = await mistralmodel.invoke([
    new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.    
        `),
    new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:
            "${message}"
            `),
  ]);

  return response.text;
}
