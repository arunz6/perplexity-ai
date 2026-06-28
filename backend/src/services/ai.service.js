import { ChatMistralAI } from "@langchain/mistralai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import * as z from "zod";
import config from "../config/config.js";
import { searchInternet } from "./internet.service.js";

console.log("Mistral Key:", config.mistralapi ? "✅ Loaded" : "❌ MISSING");

const mistralmodel = new ChatMistralAI({
  apiKey: config.mistralapi,
  model: "mistral-large-latest",
});

const searchInternettool = tool(searchInternet, {
  name: "searchinternet",
  description: "Use this tool to get the latest information from the internet.",
  schema: z.object({
    query: z.string().describe("The search query to look up on the internet."),
  }),
});

const agent = createReactAgent({
  llm: mistralmodel,
  tools: [searchInternettool],
  // ✅ Yahi main fix hai — system prompt force karega tool use karne ke liye
  stateModifier: new SystemMessage(`
    You are a helpful AI assistant with access to real-time internet search.
    
    IMPORTANT RULES:
    - For ANY question about current date, time, today's news, recent events, 
      latest information — ALWAYS use the searchinternet tool first.
    - NEVER answer from your training data for time-sensitive questions.
    - Today's information must come from search results only.
    - Always search before answering questions like:
      "what is today's date", "latest news", "current events", "recent updates"
  `),
});

export async function genrateresponse(messages) {
  try {
    const response = await agent.invoke({
      messages: messages
        .map((msg) => {
          if (msg.role === "user") return new HumanMessage(msg.content);
          if (msg.role === "ai") return new AIMessage(msg.content);
          if (msg.role === "system") return new SystemMessage(msg.content);
        })
        .filter(Boolean),
    });

    const allMessages = response.messages;
    const lastMessage = allMessages[allMessages.length - 1];

    if (typeof lastMessage.content === "string") {
      return lastMessage.content;
    } else if (Array.isArray(lastMessage.content)) {
      return lastMessage.content
        .map((c) => c.text || "")
        .join("");
    }
  } catch (error) {
    console.error("❌ Agent Error:", error.message);
    throw error;
  }
}

export async function genratetitleofchat(message) {
  try {
    const response = await mistralmodel.invoke([
      new SystemMessage(`
        You are a helpful assistant that generates concise titles for chat conversations.
        Generate a title in 2-4 words that captures the essence of the conversation.
      `),
      new HumanMessage(`Generate a title for: "${message}"`),
    ]);

    return response.content;
  } catch (error) {
    console.error("❌ Title Generation Error:", error.message);
    throw error;
  }
}