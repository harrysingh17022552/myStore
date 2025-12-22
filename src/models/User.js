import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  mobile: BigInt,
});
const user = mongoose.model("users", userSchema);
export default user;
