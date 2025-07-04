import { uploadImage } from "../lib/cloudinary.js";
import OrderItem from "../Models/orderItem.js";
import Order from "../Models/orderModel.js";
import Payment from "../Models/paymentModel.js";
import Product from "../Models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      description,
      condition,
      negotiable,
      productImages,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !category ||
      !price ||
      !condition ||
      !productImages ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const uploadedImages = await Promise.all(
      productImages.map(async (img) => await uploadImage(img))
    );
    // Create new product
    const newProduct = {
      seller: req.seller._id,
      name,
      category,
      price,
      condition,
      description,
      negotiable,
      productImages: uploadedImages,
    };

    // Save product to database
    const product = await Product.create(newProduct);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error(`Error adding product: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProductStatus = async (req, res) => {
  try {
    const sellerId = req.seller?._id || "";

    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Seller info missing",
      });
    }

    // Step 1: Get all products of this seller
    const products = await Product.find({
      seller: sellerId,
      status: "approved",
    });

    const productIds = products.map((p) => p._id);

    // Step 2: Get orderItems of those products
    const orderItems = await OrderItem.find({ product: { $in: productIds } });

    // Step 3: Create map from productId to orderItem and collect orderIds
    const productToOrderItemMap = {};
    const orderIdsSet = new Set();

    orderItems.forEach((item) => {
      productToOrderItemMap[item.product.toString()] = item;
      orderIdsSet.add(item.order.toString());
    });

    const orderIdsArray = Array.from(orderIdsSet);

    // Step 4: Get payments
    const payments = await Payment.find({
      order: { $in: orderIdsArray },
    });

    const orderToPaymentStatusMap = {};
    payments.forEach((payment) => {
      orderToPaymentStatusMap[payment.order.toString()] = payment.status;
    });

    // Step 5: Get orders to extract buyer info
    const orders = await Order.find({ _id: { $in: orderIdsArray } });

    const orderToBuyerInfoMap = {};
    orders.forEach((order) => {
      orderToBuyerInfoMap[order._id.toString()] = {
        location: order.delivery_location || "Not provided",
        phone: order.buyer_phone || "Not provided",
      };
    });

    // Step 6: Combine data into response
    const response = products.map((product) => {
      const orderItem = productToOrderItemMap[product._id.toString()];

      if (!orderItem) {
        return {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.productImages?.[0]?.url || null,
          status: "available",
          delivery_location: null,
          buyer_phone: null,
        };
      }

      const paymentStatus = orderToPaymentStatusMap[orderItem.order.toString()];
      let status = "available";

      if (paymentStatus === "paid") {
        status = orderItem.delivery_status || "booked"; // Use delivery status if available
      } else {
        status = "pending payment";
      }

      const buyerInfo = orderToBuyerInfoMap[orderItem.order.toString()] || {
        location: null,
        phone: null,
      };

      return {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.productImages?.[0]?.url || null,
        status,
        delivery_location: buyerInfo.location,
        buyer_phone: buyerInfo.phone,
      };
    });

    res.status(200).json({ success: true, products: response });
  } catch (error) {
    console.error("Error fetching seller products:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProductStatus = async (req, res) => {
  try {
    const { productId } = req.params;
    const { updateStatus } = req.body;

    // Step 1: Find the orderItem for this product
    const orderItem = await OrderItem.findOne({ product: productId });

    if (!orderItem) {
      return res.status(404).json({
        success: false,
        message: "Order item not found for this product.",
      });
    }

    // Step 2: Update orderItem status
    orderItem.delivery_status = updateStatus;
    await orderItem.save();

    // Step 3: If delivered, update product status to "sold"
    if (updateStatus === "delivered") {
      await Product.findByIdAndUpdate(productId, { status: "sold" });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully.",
      orderItemStatus: orderItem.status,
      ...(updateStatus === "delivered" && { productStatus: "sold" }),
    });
  } catch (error) {
    console.error("Error updating product/orderItem status:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getPendingStatus = async (req, res) => {
  try {
    const pendingProducts = await Product.find({
      seller: req.seller._id,
      status: { $in: ["pending", "rejected"] },
    });

    return res.status(200).json({
      success: true,
      products: pendingProducts,
    });
  } catch (error) {
    console.log("Error in get pending status", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSoldProducts = async (req, res) => {
  try {
    const soldProducts = await Product.find({
      seller: req.seller._id,
      status: "sold",
    });
    return res.status(200).json({
      success: true,
      products: soldProducts,
    });
  } catch (error) {
    console.log("Error in get pending status", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const productIfBooked = await OrderItem.findOne({ product: productId });

    if (productIfBooked) {
      return res.status(400).json({
        success: false,
        message: "Product already booked by buyer",
      });
    }

    await Product.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Successfully deleted the product",
    });
  } catch (error) {
    console.log("Error in delete products in seller controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
