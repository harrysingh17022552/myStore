//we will be using this for password encryption
import bcrypt from "bcrypt";
//we will be using to create access token using jwt.sign
import jwt from "jsonwebtoken";
//this model will be used to interact us with users collection in our mongo DB
import user from "../models/User.js";

// Register Controller
// 1. destructuring all fields from the request body and checking them weather there ia any data in this field or not, Checking for mandatory field, if they are empty then sending response with code 400:BAD REQUEST, with message Missing Imp Fields.
// 2. Using try/catch, so that any error occur in code can be easily caught.
// 3. Now using 'user' model, we will be checking in our mongoDB, whether this user already exist or not. If exist then send 403:CONFLICT status code for conflict with message user already exist.
// 4. Now encrypt the password with payload password in req using bcrypt, here for encryption and decryption, we will be using bcrypt package.
// 5. Now structure newUser object with all properties, we have assigned while creating user model.
// 6. In mongo we create a record using .create along with model or using .save(). Here we will be using .create. This will create new user at users collection and return the promise with the record created.
// 7. On successful user creation response is sended with status 201:CREATED.
export const Register = async (req, res) => {
  const { firstname, lastname, gender, email, password, mobile } = req.body;
  if (!firstname || !lastname || !gender || !email || !password || !mobile) {
    return res.status(400).json({ message: "Missing Important Fields" });
  }
  try {
    const userExisting = await user.findOne({ email });
    if (userExisting) {
      return res.status(409).json({ message: "User already exist" });
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

// Login Controller
// 1. destructuring email and password from the request body
// 2. Using try/catch, so that any error occur in code can be easily caught.
// 3. Error handling for empty email and password.
// 4. Check for the user exist in our DB or not, if not then send response with status not registered.
// 5. After that compare the password with the password in DB of that user and the password in request, if not matches then send response with incorrect password with status code 401, where 401 is for unauthorized.
// 6. Then create token for the user so that can be authorized in secure requests to get response. Send that token the client side using response with status code 200, with message successfully authorized.
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
