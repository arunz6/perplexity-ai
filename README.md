# 🔍 Perplexity AI Clone — Agentic Search-Augmented Chat App

A full-stack AI chat application that mimics Perplexity AI's core capability: an LLM agent that **decides on its own** when to search the live internet before answering, instead of relying purely on training data. Built with a ReAct agent (LangGraph), real-time web search (Tavily), JWT auth with email verification, and persistent chat history.

---

## 🎯 What It Does

1. User signs up → receives an **email verification link** → logs in with JWT stored in a cookie.
2. User starts a chat — an AI-generated **title** is created for the conversation automatically.
3. On each message, a **ReAct agent** (powered by Mistral) decides whether the query needs real-time info.
4. If needed, the agent calls a **search tool** (Tavily API) to fetch live results, then reasons over them before replying — this is the "Perplexity" behavior: answers grounded in fresh, cited web data instead of stale model knowledge.
5. Full chat history is persisted in MongoDB, so conversations survive across sessions.

---

## 🏗️ Architecture

```
┌──────────────┐      HTTP/Cookie-JWT      ┌───────────────────┐
│   React (Vite)│ ─────────────────────────▶│   Express Server    │
│   Frontend    │◀───────────────────────── │   (REST API)        │
└──────────────┘                            └─────────┬───────────┘
                                                        │
                              ┌─────────────────────────┼─────────────────────────┐
                              ▼                         ▼                         ▼
                     ┌────────────────┐       ┌──────────────────┐      ┌──────────────────┐
                     │  Auth Layer     │       │  Chat Controller   │      │  Socket.io Layer   │
                     │  JWT + bcrypt   │       │  (persists msgs)   │      │  (real-time infra) │
                     │  + email verify │       └─────────┬──────────┘      └──────────────────┘
                     └────────────────┘                  ▼
                                              ┌──────────────────────┐
                                              │   ReAct Agent (LangGraph) │
                                              │   Model: Mistral Large     │
                                              └──────────┬───────────────┘
                                                          │ decides: "do I need live data?"
                                                          ▼
                                              ┌──────────────────────┐
                                              │  Tavily Search Tool    │
                                              │  (real-time web search) │
                                              └──────────────────────┘
                                                          │
                                                          ▼
                                              ┌──────────────────────┐
                                              │      MongoDB            │
                                              │  Users / Chats / Msgs   │
                                              └──────────────────────┘
```

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| Agent Framework | `LangGraph` (`createReactAgent`) + `LangChain Core` |
| LLM | Mistral (`mistral-large-latest`) via `@langchain/mistralai` |
| Real-Time Search | `Tavily API` (`@tavily/core`) — wrapped as a LangChain tool |
| Backend | `Express.js`, `Node.js` |
| Database | `MongoDB` + `Mongoose` |
| Auth | `JWT` (`jsonwebtoken`), `bcrypt` password hashing, email verification via `Nodemailer` |
| Real-Time Infra | `Socket.io` |
| Validation | `express-validator`, `Zod` (tool schema) |
| Frontend | `React (Vite)` |

---

## 🧠 How the Agent Decides to Search

The agent isn't hardcoded to always search — it's a **ReAct agent** with a system prompt that forces tool use only when the query is time-sensitive:

```js
const agent = createReactAgent({
  llm: mistralmodel,
  tools: [searchInternettool],
  stateModifier: new SystemMessage(`
    For ANY question about current date, time, today's news, recent events,
    latest information — ALWAYS use the searchinternet tool first.
    NEVER answer from your training data for time-sensitive questions.
  `),
});
```

The search tool itself is registered with a strict Zod schema, so the agent's tool calls are always well-formed:

```js
const searchInternettool = tool(searchInternet, {
  name: "searchinternet",
  schema: z.object({ query: z.string() }),
});
```

This is genuine **agentic reasoning** — the model reads the conversation, decides *if* a tool call is needed, calls it, reads results, and only then composes the final answer.

---

## 📁 Project Structure

```
perplexity-ai/
├── backend/
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/
│       │   ├── config.js
│       │   └── connecttodb.js
│       ├── controller/
│       │   ├── auth.controller.js      # register, login, verify-email, getme
│       │   └── chat.controller.js      # chat CRUD + message handling
│       ├── middleware/
│       │   ├── auth.middleware.js      # JWT verification
│       │   └── err.mddleware.js
│       ├── model/
│       │   ├── user.model.js
│       │   ├── chat.model.js
│       │   └── message.model.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   └── chat.routes.js
│       ├── services/
│       │   ├── ai.service.js           # ReAct agent + response generation
│       │   ├── internet.service.js     # Tavily search wrapper
│       │   └── nodemailer.js           # email verification sender
│       ├── socket/server.socket.js     # Socket.io setup
│       └── validator/auth.validator.js
│
└── frontend/
    └── src/                            # React (Vite) chat UI
```

---

## 📡 API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ | Registers user, sends verification email |
| `GET` | `/api/auth/verify-email` | ❌ | Verifies email via JWT token in query param |
| `POST` | `/api/auth/login` | ❌ | Validates credentials, sets JWT cookie |
| `GET` | `/api/auth/getme` | ✅ | Returns logged-in user's profile |
| `POST` | `/api/chat/message` | ✅ | Sends a message; creates chat + AI-generated title if new |
| `GET` | `/api/chat` | ✅ | Lists all chats for the logged-in user |
| `GET` | `/api/chat/:chatId/messages` | ✅ | Fetches full message history for a chat |
| `DELETE` | `/api/chat/delete/:chatId` | ✅ | Deletes a chat and all its messages |

---

## 🔐 Auth Flow

1. **Register** → password hashed with `bcrypt` → user saved as unverified → verification email sent with a signed JWT link.
2. **Verify Email** → token decoded → `user.verified = true`.
3. **Login** → blocked if `user.verified === false` → password compared with `bcrypt.compare` → JWT issued (3-day expiry) → set as an HTTP cookie.
4. **Protected routes** → `auth.middleware.js` reads the cookie, verifies the JWT, attaches `req.user`.

---

## 🚀 Running Locally

### Backend
```bash
cd backend
npm install
# configure .env (see below)
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables (`backend/.env`)
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MISTRAL_API_KEY=your_mistral_key
TAVILY_API_KEY=your_tavily_key
SMTP_USER=your_email
SMTP_PASS=your_email_app_password
```

---

## 💡 Why This Project Matters

- **Agentic tool-calling**, not just prompt-response — the LLM decides *when* to invoke a tool, which is a genuinely different (and harder) pattern than a plain chatbot wrapper.
- **Search-grounded answers** — the core idea behind Perplexity/RAG-style products: reduce hallucination for time-sensitive queries by injecting live data before the model answers.
- **Production-shaped auth** — email verification + JWT cookies + bcrypt, not just a toy login form.
- **Persistent, structured chat history** — chats and messages are properly modeled and queryable per user, not stored in memory.

---

## 🔮 Possible Extensions

- Stream the agent's tool-use steps to the frontend live (show "Searching the web..." states)
- Add source citations in the UI, linking back to the URLs Tavily returned
- Add refresh-token rotation for longer, safer sessions
- Rate-limit the `/message` endpoint to control API costs
