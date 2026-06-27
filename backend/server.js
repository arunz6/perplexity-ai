import app from "./src/app.js";
import connecttodb from "./src/config/connecttodb.js";

import http from "http";
import { initSocket } from "./src/socket/server.socket.js";

connecttodb();

const httpServer = http.createServer(app);

initSocket(httpServer);

httpServer.listen(5000, () => {
  console.log("server is running ");
});

// 57 min class 120;
//  class 121
