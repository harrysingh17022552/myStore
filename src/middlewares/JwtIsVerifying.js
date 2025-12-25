import jwt from "jsonwebtoken";
const Verify = (req, res, next) => {
  // getting token from header where there will be property name authorization
  const header = req.headers["authorization"];
  // return statement when token is not attached at header
  if (!header) {
    return res
      .status(401)
      .json({ message: "Looks like you have not login yet" });
  }
  // till here token looks like 'bearer token....'
  //after split ['bearer','token....']
  const token = header.split(" ")[1];
  // using jwt verify to check weather the token is valid or not by passing payload, our secret key that will return error(if any) and the decoded payload that was attached while jwt.sign()
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.error(err.message);
      return res.status(400).json({ message: "Not Valid Token" });
    }
    //we will be using this to find out user from our DB.
    req.user = decoded.email;
    console.log("JWT verified");
    next();//pas to next
  });
};
export default Verify;
