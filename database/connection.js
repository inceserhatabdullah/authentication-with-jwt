import mongoose from "mongoose";
import config from "../config.js";

const { connectionUrl } = config.mongo;

export default mongoose.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error) => {
    if (error) {
      throw error;
    }
    console.info("Connected to database!");
  }
);
