import OrderItem from "../Models/orderItem.js";
import Payment from "../Models/paymentModel.js";
import Product from "../Models/productModel.js";
import SellerPayment from "../Models/sellerPaymentModel.js";

export async function getUnapprovedProducts(req, res) {
  try {
    const unapprovedProducts = await Product.find({
      status: "pending",
    }).select("name price productImages category condition negotiable");

    res.status(200).json({
      success: true,
      products: unapprovedProducts,
    });
  } catch (error) {
    console.log("Error in admin- get all products: ", error);
    return (
      res.status(500),
      json({
        success: false,
        message: "Internal server error",
      })
    );
  }
}

export const getProductByIdAdmin = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.productId,
    }).select(
      "name price description productImages category condition negotiable"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error(`Error fetching product: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export async function respondProducts(req, res) {
  try {
    const { productId } = req.params;
    const { status } = req.body;

    console.log(status);

    if (status !== "approved" && status !== "rejected") {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Can only approve or reject products",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    const approvedProduct = await Product.findByIdAndUpdate(
      productId,
      { status: status },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Product ${status}`,
    });
  } catch (error) {
    console.log("Error in admin- Approve Products: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getRejectedProducts(req, res) {
  try {
    const rejectedProducts = await Product.find({
      status: "rejected",
    }).select("name price productImages category condition negotiable");

    res.status(200).json({
      success: true,
      products: rejectedProducts,
    });
  } catch (error) {
    console.log("Error in admin- get rejected products: ", error);
    return (
      res.status(500),
      json({
        success: false,
        message: "Internal server error",
      })
    );
  }
}

export async function getPendingPayments(req, res) {
  try {
    const pendingPayments = await Payment.find({ status: "pending" }).populate(
      "buyer",
      "name"
    );

    res.status(200).json({
      success: true,
      payments: pendingPayments,
    });
  } catch (error) {
    console.log("Error in admin- get pending payments: ", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function acceptPayment(req, res) {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    if (payment.status === "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment is already marked as paid",
      });
    }

    payment.status = "paid";
    await payment.save();

    const orderItems = await OrderItem.find({ order: payment.order });

    for (const item of orderItems) {
      if (!item.product) continue;

      const totalAmount = item.price;
      const commission = totalAmount * 0.2;
      const sellerAmount = totalAmount - commission;

      await SellerPayment.create({
        seller: item.seller,
        orderItem: item._id,
        amount: sellerAmount,
        paid_at: new Date(),
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment accepted and seller payouts calculated.",
    });
  } catch (error) {
    console.error("Error in acceptPayment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getSellerPendingPayments(req, res) {
  try {
    let pendingSellerPayments = await SellerPayment.find({
      is_paid: false,
    })
      .populate("seller", "name phone")
      .populate({
        path: "orderItem",
        populate: {
          path: "product",
          select: "name productImages", // we need `images` to get index 0
        },
      });

    // Map to include only the first image URL from images array
    pendingSellerPayments = pendingSellerPayments.map((payment) => {
      const product = payment.orderItem?.product;

      const imageUrl =
        product?.productImages && product.productImages.length > 0
          ? product.productImages[0].url
          : null;

      return {
        ...payment.toObject(),
        orderItem: {
          ...payment.orderItem.toObject(),
          product: {
            name: product?.name,
            imageUrl, // Only the first image URL
          },
        },
      };
    });

    return res.status(200).json({
      success: true,
      payments: pendingSellerPayments,
    });
  } catch (error) {
    console.log("Error in admin - get seller pending payments: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function updateSellerPayment(req, res) {
  try {
    const { paymentId } = req.params;

    await SellerPayment.findByIdAndUpdate(
      paymentId,
      { is_paid: true, paid_at: new Date() },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Seller Paid Successfully",
    });
  } catch (error) {
    console.log("Error in admin- update seller payment: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
