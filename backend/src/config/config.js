import dotenv from "dotenv";

dotenv.config();

if (!process.env.mongouri) {
  throw new Error(
    "mongo uri is not present in dot env or we cant access dot env ",
  );
}
if(!process.env.Client_ID){
  throw new Error(
    "Client_ID is not present in dot env or we cant access dot env ",
  );
}
if(!process.env.Client_Secret){
  throw new Error(
    "Client_Secret is not present in dot env or we cant access dot env ",
  );
}
if(!process.env.Refresh_token){
  throw new Error(
    "Refresh_token is not present in dot env or we cant access dot env ",
  );
}
if(!process.env.Google_user){
  throw new Error(
    "Google_user is not present in dot env or we cant access dot env ",
  );
}

const config = {
  mognouri: process.env.mongouri,
  Client_ID: process.env.Client_ID,
  Client_Secret: process.env.Client_Secret,
  Refresh_token: process.env.Refresh_token,
  Google_user: process.env.Google_user
};



export default config