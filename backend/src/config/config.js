import dotenv from "dotenv";

dotenv.config();

if (!process.env.mongouri) {
  throw new Error(
    "mongo uri is not present in dot env or we cant access dot env ",
  );
}

const config = {
  mognouri: process.env.mongouri,
};



export default config