import express from "express";
import errhandler from "./middleware/err.mddleware.js";
import authroute from "./routes/auth.routes.js";



const app = express();
app.use(express.json())


app.use("/api/auth",authroute)



app.get("/error", (req, res, next) => {
  try {
    console.log(edi);
  } catch (error) {
    error.statusCode = 250
    next(error);
  }
});

app.use(errhandler);
export default app;








