import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbName = process.env.dbName;
const dbUsername = process.env.dbUsername;
const dbPassword = encodeURIComponent(process.env.dbPassword);
const dbHost = process.env.dbHost;
const dbOptions = process.env.dbOptions;
const connectDB = async () => {
  try {
    const url = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?${dbOptions}`;
    await mongoose.connect(url);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Failed connecting to database");
    console.log(error.message);
    process.exit(1);
  }
};
export default connectDB;
