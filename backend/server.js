import app from "./src/app.js";
import connecttodb from "./src/config/connecttodb.js";
import testai from "./src/services/ai.service.js";
import textai from "./src/services/ai.service.js";

connecttodb();
testai();

app.listen(5000, () => {
  console.log("server is running ");
});

// 57 min class 120;
//  class 121
