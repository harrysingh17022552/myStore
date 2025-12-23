import Product from "../models/Product.js";

export const getProduct = async (req, res) => {
  try {
    const productExist = await Product.findById(req.params.id);
    if (!productExist) {
      return res.status(404).json({ message: "The product is not found" });
    }
    console.log("Successfully fetched product");
    return res
      .status(200)
      .json({ message: "Successfully fetched product", product: productExist });
  } catch (error) {
    console.error("Caught error from getProduct Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const AllProduct = await Product.find({});
    if (!AllProduct) {
      return res.status(404).json({ message: "No Product Found" });
    }
    console.log("Successfully fetched all product");
    return res.status(200).json({
      message: "Successfully fetched all product",
      product: AllProduct,
    });
  } catch (error) {
    console.error("Caught error from getAllProduct Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  if (!name || !price || !stock) {
    return res.status(400).json({ message: "Missing Important Fields" });
  }
  try {
    const createProduct = await Product.create({
      name,
      description: description || "not provided yet",
      price,
      stock,
    });
    if (!createProduct) {
      return res.status(503).json({ message: "Failed to add new Product" });
    }
    console.log("Successfully added new product");
    return res.status(200).json({
      message: "Successfully added new product",
      productAdded: createProduct,
    });
  } catch (error) {
    console.error("Caught error from addProduct Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  if (!name || !price || !stock) {
    return res.status(400).json({ message: "Missing Important Fields" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        overwrite: true,
        runValidators: true,
        new: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "The product is not found" });
    }
    console.log("Successfully updated product data");
    return res
      .status(200)
      .json({ message: "Successfully updated product data", updatedProduct });
  } catch (error) {
    console.error("Caught error from updateProduct Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    //why I used findByIdAndDelete instead of deleteOne because findByIdAndDelete returns the record which has been deleted where deleteOne don't do that it returns record number that delete
    // and in current scenario findByIdAndDelete suits best
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.status(404).json({ message: "The product is not found" });
    }
    console.log("Successfully deleted product");
    return res.status(200).json({
      message: "Successfully deleted product",
      deletedProduct: deleteProduct,
    });
  } catch (error) {
    console.error("Caught error from deleteProduct Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
