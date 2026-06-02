import express from "express";
import errhandler from "./middleware/err.mddleware.js";
import authroute from "./routes/auth.routes.js";
import cookieparser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authroute);

app.use(errhandler);
export default app;
