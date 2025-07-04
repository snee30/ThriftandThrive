import { Router } from "express";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  getProductsByCategory,
  getProductsBySearch,
} from "../Controller/public.controller.js";

const router = Router();

router.get("/all-products", getAllProducts);
router.get("/product/:productId", getProductById);
router.get("/category/:category", getProductsByCategory);
router.get("/search", getProductsBySearch);

router.get("/featured-products", getFeaturedProducts);

export default router;
// This code defines a public route for fetching all products from the database.
