import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import config from "../config/config.js";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: config.ai_api_key,
});

 export default  async function testai(params) {
  model.invoke("my name is arun  ").then((res) => {
    console.log(res.text);
  });
}
