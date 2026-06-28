import { tavily as Tavily } from "@tavily/core";
import config from "../config/config.js";

const tavily = Tavily({
  apiKey: config.tavilyapi,
});

export const searchInternet = async ({ query }) => {
  const results = await tavily.search(query, {
    maxResults: 5,
  });

  console.log(JSON.stringify(results));

  return JSON.stringify(results);
};
