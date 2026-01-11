import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // no extra options
    console.log("🔥 MongoDB Connected Successfully");
  } catch (error) {
    console.log("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
