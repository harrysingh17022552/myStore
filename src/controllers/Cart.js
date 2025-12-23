import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
export const getCartItem = async (req, res) => {
  try {
    const getItem = await Cart.find({}).populate("product_id").lean();
    if (!getItem || getItem.length == 0) {
      return res.status(404).json({ message: "Your Cart is currently Empty" });
    }
    const productWrap = getItem.map((prod) => {
      const { _id, ...other } = prod.product_id;
      const { product_id, ...outOther } = prod;
      return { ...outOther, ...other };
    });

    console.log("Successfully fetch all cart Item");
    return res.status(200).json({
      message: "Successfully fetch all cart Item",
      items: productWrap,
    });
  } catch (error) {
    console.log("Caught Error from getCartItem controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const addCartItem = async (req, res) => {
  try {
    const ProductExist = await Product.findById(req.params.id);
    if (!ProductExist) {
      return res
        .status(400)
        .json({ message: `We don't have any such type of product` });
    }
    const ItemExist = await Cart.updateOne(
      { product_id: req.params.id },
      { $inc: { quantity: +1 } }
    );
    if (ItemExist.matchedCount == 0) {
      const AddItem = await Cart.create({ product_id: req.params.id });
      if (!AddItem) {
        return res
          .status(503)
          .json({ message: "Failed to add new Item in Cart" });
      }
    }
    console.log("Successfully added Item to the Cart");
    return res
      .status(201)
      .json({ message: "Successfully added Item to the Cart" });
  } catch (error) {
    console.log("Caught Error from addCartItem controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  if (!quantity) {
    return res.status(400).json({ message: "Missing Important field" });
  }
  const updateItem = await Cart.findByIdAndUpdate(
    req.params.id,
    { $set: { quantity } },
    { new: true, runValidators: true }
  );
  if (!updateItem) {
    return res
      .status(404)
      .json({ message: `You don't have any such item in the cart` });
  }
  console.log("Successfully updated cart Item");
  return res.status(200).json({ message: "Successfully updated cart Item" });
};
export const deleteCartItem = async (req, res) => {
  try {
    //why I used findByIdAndDelete instead of deleteOne because findByIdAndDelete returns the record which has been deleted where deleteOne don't do that it returns record number that delete
    // and in current scenario findByIdAndDelete suits best
    const deleteItem = await Cart.findByIdAndDelete(req.params.id);
    if (!deleteItem) {
      return res
        .status(404)
        .json({ message: "No such Item added to the cart" });
    }
    console.log("Successfully deleted item from Cart");
    return res.status(200).json({
      message: "Successfully deleted item from Cart",
      deletedItem: deleteItem,
    });
  } catch (error) {
    console.error("Caught error from deleteCartItem Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const clearCart = async (req, res) => {
  try {
    const clearCart = await Cart.deleteMany({});
    console.log("Successfully cleared Cart");
    return res.status(200).json({ message: "Successfully cleared Cart" });
  } catch (error) {
    console.error("Caught error from clearCart Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
