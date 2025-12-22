import jwt from "jsonwebtoken";
const Verify = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res
      .status(401)
      .json({ message: "Looks like you have not login yet" });
  }
  const token = header.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Not Valid Token" });
    }
    req.email = decoded.email;
    res.statusCode(200);
    next();
  });
};
export default Verify;
