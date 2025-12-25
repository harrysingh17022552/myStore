//this model will be used to interact us with products collection in our mongo DB
import Product from "../models/Product.js";

// this controller will fetch only the product from products collection, whose id is provided and this will be provided in url and can be accessed from request params.
// we will be using .findById to get particular product, this will return null if product does not exist and then response will be send with status code 404:NOT FOUND and if product exist then return the product that requested, then send that to client with status code 200.
// Using try/catch, so that any error occur in code can be easily caught.
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

// this controller will fetch the all product from products collection.
// we will be using .find({}) to get all records, if no product will found it will return null and then response will be send with status code 404:NOT FOUND otherwise send response with code 200 and successful message with all products.
// Using try/catch, so that any error occur in code can be easily caught.
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

// In this controller, we will be creating new product with information provided within body.
// destructure the field provided in request body.
// then validate all mandatory field with their respective validation, we are using error array to store the errors for validation.
// Not included description in validation because it is not mandatory also defined not mandatory in schema.
// If any error occurs response will be send with status code 400:BAD REQUEST.
// then product will be created using Product model and after successful creation response will be send with status code 201:CREATED with message and product created just now.
export const addProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const errors = [];
  if (!name || typeof name !== "string") errors.push("Invalid name");
  if (typeof price !== "number" || price <= 0) errors.push("Invalid price");
  if (!Number.isInteger(stock) || stock < 0) errors.push("Invalid stock");
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
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
    return res.status(201).json({
      message: "Successfully added new product",
      productAdded: createProduct,
    });
  } catch (error) {
    console.error("Caught error from addProduct Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// As we are using put request then we will be updating whole records
// In this controller, we will be updating existing product with information provided within body.
// destructure the field provided in request body.
// then validate all mandatory field with their respective validation, we are using error array to store the errors for validation.
// Not included description in validation because it is not mandatory also defined not mandatory in schema.
// If any error occurs response will be send with status code 400:BAD REQUEST.
// now controller will be check weather this product exist or not with help of id attached in request params, if ID not exist then send response with code 404 and message, otherwise update the record and return the record that has been updated recently and then response with success code and message with updated record.
export const updateProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const errors = [];
  if (!name || typeof name !== "string") errors.push("Invalid name");
  if (typeof price !== "number" || price <= 0) errors.push("Invalid price");
  if (!Number.isInteger(stock) || stock < 0) errors.push("Invalid stock");
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
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

//This controller simply takes id from request params and then delete that record from carts collection, if id exist then it will be deleted and returns with item deleted otherwise return null, then that will send response to client with code 404:NOT FOUND
//Any error will be handle by try/catch
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
