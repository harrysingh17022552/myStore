import mongoose from "mongoose";
const Validate = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Missing product ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID format",
    });
  }
  next();
};
export default Validate;
