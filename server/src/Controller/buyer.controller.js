import OrderItem from "../Models/orderItem.js";
import Order from "../Models/orderModel.js";

export async function getGroupedOrders(req, res) {
  try {
    const orders = await Order.find({ buyer: req.buyer._id })
      .sort({ createdAt: -1 }) // latest orders first
      .lean();

    const grouped = {};

    for (const order of orders) {
      const dateKey = new Date(order.createdAt).toISOString().split("T")[0]; // yyyy-mm-dd

      const orderItems = await OrderItem.find({ order: order._id })
        .populate({
          path: "product",
          select: "name image productImages",
        })
        .lean();

      if (!grouped[dateKey]) grouped[dateKey] = [];

      grouped[dateKey].push(...orderItems);
    }

    return res.status(200).json({
      success: true,
      groupedOrders: grouped,
    });
  } catch (err) {
    console.error("Error getting grouped orders:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
