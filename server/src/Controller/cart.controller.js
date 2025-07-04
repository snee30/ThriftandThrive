import cartModel from "../Models/cartModel.js";
import OrderItem from "../Models/orderItem.js";
import Order from "../Models/orderModel.js";
import Payment from "../Models/paymentModel.js";

export const addToCart = async (req, res) => {
  const { productId } = req.params;
  const buyerId = req.buyer?._id || "";

  if (!buyerId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Buyer info is missing",
    });
  }

  try {
    let cart = await cartModel.findOne({ buyer: buyerId });

    if (cart) {
      // Only add if product is not already in the cart
      const alreadyInCart = cart.items.includes(productId);
      if (!alreadyInCart) {
        cart.items.push(productId);
        await cart.save();
        return res
          .status(200)
          .json({ success: true, message: "Added to cart" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Item already in cart" });
      }
    } else {
      // No cart exists yet, create one
      cart = new cartModel({
        buyer: buyerId,
        items: [productId],
      });
      await cart.save();
      return res
        .status(200)
        .json({ success: true, message: "Added to cart", cart });
    }
  } catch (error) {
    console.error("Cart error:", error);
    res.status(500).json({ success: false, message: "Cart error", error });
  }
};

export const viewCart = async (req, res) => {
  try {
    const buyerId = req.buyer?._id || "";

    if (!buyerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Buyer info is missing",
      });
    }

    const cart = await cartModel
      .findOne({ buyer: buyerId })
      .populate("items", "name price productImages");

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart is Empty" });
    }

    // Format only first image from productImages
    const simplifiedCart = {
      ...cart._doc,
      items: cart.items.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.productImages?.[0]?.url || null,
      })),
    };

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      cart: simplifiedCart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Remove an item from the cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const buyerId = req.buyer?._id || ""; // from token middleware

  if (!buyerId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Buyer info is missing",
    });
  }

  try {
    const cart = await cartModel.findOne({ buyer: buyerId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Filter out the product
    cart.items = cart.items.filter((item) => item.toString() !== productId);

    await cart.save();

    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error removing item", error });
  }
};

export const checkoutCart = async (req, res) => {
  try {
    const buyerId = req.buyer?._id || "";
    if (!buyerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Buyer info is missing",
      });
    }

    const { delivery_location, buyer_phone, transactionId } = req.body;

    if (!delivery_location || !buyer_phone || !transactionId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    if (!/^[0-9]{10}$/.test(buyer_phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits",
      });
    }

    const cart = await cartModel.findOne({ buyer: buyerId }).populate("items");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Step 1: Get all purchased product IDs from OrderItem
    const orderedItems = await OrderItem.find({}, "product");
    const orderedProductIds = new Set(
      orderedItems.map((item) => item.product.toString())
    );

    // Step 2: Check for unavailable products in the cart
    const unavailableProducts = cart.items.filter((item) =>
      orderedProductIds.has(item._id.toString())
    );

    if (unavailableProducts.length > 0) {
      const names = unavailableProducts.map((item) => item.name).join(", ");
      return res.status(400).json({
        success: false,
        message: `Some items are no longer available: ${names}`,
      });
    }

    // Step 3: Create the Order
    const order = await Order.create({
      buyer: buyerId,
      delivery_location,
      buyer_phone,
    });

    // Step 4: Create OrderItems
    await Promise.all(
      cart.items.map((item) =>
        OrderItem.create({
          order: order._id,
          product: item._id,
          seller: item.seller,
          price: item.price,
        })
      )
    );

    // Step 5: Calculate total amount and record payment
    const totalAmount = cart.items.reduce((sum, item) => sum + item.price, 0);

    await Payment.create({
      order: order._id,
      buyer: buyerId,
      amount: totalAmount + 100,
      transactionId,
      method: "QR",
      paid_at: new Date(),
    });

    // Step 6: Clear the cart
    cart.items = [];
    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Error in checkoutCart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
