import mongoose from "mongoose";
import config from "./config.js";

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(config.mognouri);
    console.log(`MongoDB connected ` );
  } 
  catch (err) {
    throw new Error(`Can't connect to DB${err}`);
  }
};

export default connectToDB;
