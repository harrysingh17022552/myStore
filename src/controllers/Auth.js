import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/User.js";
export const Register = async (req, res) => {
  const { firstname, lastname, gender, email, password, mobile } = req.body;
  if (!firstname || !lastname || !gender || !email || !password || !mobile) {
    return res.status(400).json({ message: "Missing Important Fields" });
  }
  try {
    const userExisting = await user.findOne({ email });
    if (userExisting) {
      return res.status(403).json({ message: "User already exist" });
    }
    const encryptPassword = await bcrypt.hash(password, 5);

    const newUser = {
      firstname,
      lastname,
      gender,
      email,
      password: encryptPassword,
      mobile,
    };
    const creatUser = await user.create(newUser);
    if (!creatUser) {
      console.log("Failed to create User");
      return res.status(503).json({ message: "Failed to create User" });
    }
    console.log("Successfully Created User");
    return res.status(201).json({ message: "Successfully Created User" });
  } catch (error) {
    console.log("Caught error at Registration controller ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const LogIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing important fields" });
  }
  try {
    const validUser = await user.findOne({ email });
    if (!validUser) {
      return res.status(404).json({
        message:
          "You have not registered yet, please visit our registration page",
      });
    }
    const checkPassword = await bcrypt.compare(password, validUser.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    const access_token = jwt.sign(
      { email: validUser.email },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "1d" }
    );
    return res
      .status(200)
      .json({ message: "Successfully authorized", token: access_token });
  } catch (error) {
    console.log("Caught error from Login Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
