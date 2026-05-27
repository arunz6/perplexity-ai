import app from  "./src/app.js"
import connecttodb from "./src/config/connecttodb.js"




connecttodb()

app.listen(5000,()=>{
  console.log('server is running ')
})




// 57 min class 120; 