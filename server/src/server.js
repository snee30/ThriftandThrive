// This starts your server and connects everything (routes, DB, middleware, etc.).

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.routes.js";
import sellerRoutes from "./Routes/seller.routes.js";
import publicRoutes from "./Routes/public.routes.js";
import cors from "cors";
import adminRoutes from "./Routes/admin.routes.js";
import cookieParser from "cookie-parser";
import cartRoutes from "./Routes/cart.routes.js";
import buyerRoutes from "./Routes/buyer.routes.js";

import { connectDB } from "./lib/db.js";
dotenv.config();
const app = express();
app.use(
  express.json({
    limit: "100mb",
  })
);

app.use(cookieParser()); // Add this line

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend to access
    credentials: true, // Allow cookies if required
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/buyer", buyerRoutes);

// app.use("/auth/buyer", buyerAuthRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("started at port " + PORT);
  connectDB();
});
