// define URL paths like /login, /signup, and what functions should run when someone visits those URLs.import express from "express";

import { Router } from "express";
import { getGroupedOrders } from "../Controller/buyer.controller.js";
import { isBuyer } from "../Middleware/auth.middle.js";

const router = Router();

router.use(isBuyer);

router.get("/orders", getGroupedOrders);

export default router;
