import mongoose from "mongoose";
// User Schema, which have field : firstname,lastname, gender, email, password, mobile with their respective type. Here email and password should be unique. Email should be unique we will also using this at payload in jwt, which will be further used to identify user.
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
