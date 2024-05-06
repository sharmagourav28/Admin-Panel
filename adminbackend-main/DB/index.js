import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected successfully! DB Host :${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.log("MongoDb connection failed :", error);
    process.exit(1);
  }
};

export default connectDB;
