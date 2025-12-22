import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("mongoose is connecting ....");
    await mongoose.connect(
      "mongodb+srv://harishnigam21_db_user:vb23Lml0XPbmD5rZ@panyasala.had7py6.mongodb.net/myStore",
      {
        serverSelectionTimeoutMS: 5000,
      }
    );
    const db = mongoose.connection;
    db.on("error", () => {
      console.error("mongoose failed to connect");
      return;
    });
    console.log("mongoose got connected successfully.");
  } catch (error) {
    console.error("Caught an error while connecting mongoose,", error.message);
  }
};
export default connectDB;
