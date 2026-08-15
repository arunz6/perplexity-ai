import app from "./src/app.js";
import connecttodb from "./src/config/connecttodb.js";

import http from "http";
import { initSocket } from "./src/socket/server.socket.js";


connecttodb();

const httpServer = http.createServer(app);

initSocket(httpServer);



httpServer.listen(3000, () => {
  console.log("server is running ");
});

//isme google auth ke nodemailer ke problem aa rahe h 