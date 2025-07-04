import mongoose from "mongoose";

const sellerPaymentSchema = new mongoose.Schema(
  {
    orderItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    is_paid: {
      type: Boolean,
      default: false,
    },

    method: {
      type: String,
    },

    notes: {
      type: String,
      trim: true,
    },

    paid_at: {
      type: Date,
    },
  },
  { timestamps: true }
);

const SellerPayment = mongoose.model("Seller_Payment", sellerPaymentSchema);

export default SellerPayment;
