import { connect } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await connect(process.env.MONGO_URI);

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);

    throw new Error("Failed to connect database");
  }
};
