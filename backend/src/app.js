import express from "express";
import errhandler from "./middleware/err.mddleware.js";
import authroute from "./routes/auth.routes.js";
import cookieparser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import chatrouter from "./routes/chat.routes.js";

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use("/api/auth", authroute);
app.use("/api/chat", chatrouter);

app.use(errhandler);
export default app;
