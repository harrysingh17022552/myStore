//this model will be used to interact us with carts collection in our mongo DB
import Cart from "../models/Cart.js";
//this model will be used to interact us with products collection in our mongo DB
import Product from "../models/Product.js";

// this controller will fetch the all cart item from carts collection.
// In cart model you wil be seeing that we will using only field like product id and quantity.
// Using try/catch, so that any error occur in code can be easily caught.
// 1. using .find({}) to get all records and using populate to get the respective data with the help of foreign ket 'product_id' and lean to get data plain js object.
// 2. Checking the possibilities, whether cart is empty and return response with 404:Not Found code with message 'Your Cart is currently Empty'.
// 3. we are wrapping product with respective name, description,... and sending it to the client with status code 200 with success message.
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

// 1. Here Client need not to send product data in body, they have to attach only product id in url.
// 2. After that this controller will check whether the product client is trying to add exist or not, if not then send response with code 400:BAD REQUEST with message 'We don't have any such type of product'.
// 3. Here, it will also check the item already exist in cart or not if exist then update its quantity with +1 otherwise create new record in DB by sending product id and quantity will be set to 1 as it is default.
// 4. After this response is sended with code 200 and successful message, if there will be any error that will be handle by try/catch
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

// Here at update cart controller we have taken some assumption : product data cannot be change there will be only manipulation with quantity and price calculation will be done in front end side and while placing order it will crosscheck price w.r.t quantity at placeOrder controller.
// 1. I will be check for the quantity in request body, if not then send response with code 400:BAD REQUEST with message 'Missing Important data'.
// 2. findByIdAndUpdate is used, which will be find out record w.r.t id that will be taken from request params and update its quantity with quantity in request body, this will be return record if success and return null if item not found, which will be then used for 404 status code response.
// 3. On successful update, response will be send with status code 200 and record that have been updated.
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  if (!quantity) {
    return res.status(400).json({ message: "Missing Important data" });
  }
  const updateItem = await Cart.findByIdAndUpdate(
    req.params.id,
    { $set: { quantity } },
    { new: true, runValidators: true }
  );
  if (!updateItem) {
    return res.status(404).json({
      message: `You don't have any such item in the cart`,
    });
  }
  console.log("Successfully updated cart Item");
  return res.status(200).json({
    message: "Successfully updated cart Item",
    updatedIte: updateItem,
  });
};

//This controller simply takes id from request params and then delete that record from carts collection, if id exist then it will be deleted and returns with item deleted otherwise return null, then that will send response to client with code 404:NOT FOUND
//Any error will be handle by try/catch
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

//This controller deletes all record from the carts collection
//Any error will be handle by try/catch
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
