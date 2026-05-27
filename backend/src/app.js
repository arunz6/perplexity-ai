import express from "express";
import errhandler from "./middleware/err.mddleware.js";

const app = express();






app.use(errhandler);
export default app;







// app.get("/error", (req, res, next) => {
//   try {
//     console.log(edi);
//   } catch (error) {
//     error.statusCode = 250
//     next(error);
//   }
// });
