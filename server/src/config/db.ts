import mongoose from "mongoose";

export const isDatabaseConnected = () => mongoose.connection.readyState === 1;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI is not set. Using in-memory storage fallback.");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB connection failed:", error);
    console.warn("Continuing with in-memory storage fallback.");
  }
};

export default connectDB;
