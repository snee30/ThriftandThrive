import { Router } from "express";
import { isAdmin } from "../Middleware/auth.middle.js";
import {
  acceptPayment,
  getPendingPayments,
  getProductByIdAdmin,
  getRejectedProducts,
  getSellerPendingPayments,
  getUnapprovedProducts,
  respondProducts,
  updateSellerPayment,
} from "../Controller/admin.controller.js";

const router = Router();

router.use(isAdmin);

router.get("/products/unapproved", getUnapprovedProducts);
router.get("/product/:productId", getProductByIdAdmin);
router.post("/product/respond/:productId", respondProducts);
router.get("/products/rejected", getRejectedProducts);

router.get("/payment/pending", getPendingPayments);
router.post("/payment/accept/:paymentId", acceptPayment);

router.get("/payment/seller/pending", getSellerPendingPayments);
router.post("/payment/seller/accept/:paymentId", updateSellerPayment);
export default router;
