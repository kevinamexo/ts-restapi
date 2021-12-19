import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  console.log("CONNECTING TO MONGODB");
  const dbUri = config.get<string>("dbUri");
  try {
    mongoose.connect(dbUri);
    logger.info("Connected to MongoDB");
  } catch (e) {
    logger.info("Unable to connect to MongoDB");
    process.exit(1);
  }
}
export default connect;
