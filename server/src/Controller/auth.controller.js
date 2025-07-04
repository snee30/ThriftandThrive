import jwt from "jsonwebtoken";
import Admin from "../Models/adminModel.js";
import Buyer from "../Models/buyerModel.js";
import Seller from "../Models/sellerModel.js";

function authToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWTSECRET, {
    expiresIn: "28d",
  });
}

export async function adminRegister(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate Name
    if (typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name must be a non-empty string",
      });
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate Password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long, include at least one uppercase letter, and one number",
      });
    }

    // Create a new user
    const newAdmin = await Admin.create({
      name,
      email,
      password,
    });

    const token = authToken(newAdmin._id, "admin");

    res.cookie("jwt", token, {
      maxAge: 28 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: "Admin Account Created Successfully",
      admin: {
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    if (error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        message: "email already exists,use a new one please",
      });
    }
    console.error("Error during admin signup:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Admin Login Function
export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    // Find the buyer by email
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin || !(await admin.comparePW(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = authToken(admin._id, "admin");

    // Set cookie
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
      httpOnly: true, //prevents any XSS attacks
      sameSte: "strict", //prevents any CSRF attacks
      secure: false,
    });

    // Return success response (excluding sensitive data)
    res.status(200).json({
      success: true,
      message: "Admin Login successful!",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Error during buyer login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Buyer Signup Function
export async function buyerSignup(req, res) {
  try {
    const { name, email, password, phone, address } = req.body;

    // Check if all fields are provided
    if (!email || !name || !password || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate Name
    if (typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name must be a non-empty string",
      });
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate Password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long, include at least one uppercase letter, and one number",
      });
    }

    // Validate Phone
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 10 digits",
      });
    }

    // Create a new user
    const newBuyer = await Buyer.create({
      name,
      email,
      password,
      phone,
      address,
    });

    const token = authToken(newBuyer._id, "buyer");

    res.cookie("jwt", token, {
      maxAge: 28 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: "Buyer Sign up Successful",
      buyer: {
        _id: newBuyer._id,
        name: newBuyer.name,
        email: newBuyer.email,
        phone: newBuyer.phone,
        address: newBuyer.address,
      },
    });
  } catch (error) {
    if (error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        message: "email already exists,use a new one please",
      });
    }
    console.error("Error during buyer signup:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Buyer Login Function
export async function buyerLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    // Find the buyer by email
    const buyer = await Buyer.findOne({ email }).select("+password");

    if (!buyer || !(await buyer.comparePW(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = authToken(buyer._id, "buyer");

    // Set cookie
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
      httpOnly: true, //prevents any XSS attacks
      sameSte: "strict", //prevents any CSRF attacks
      secure: false,
    });

    // Return success response (excluding sensitive data)
    res.status(200).json({
      success: true,
      message: "Buyer Login Successful",
      buyer: {
        _id: buyer._id,
        name: buyer.name,
        email: buyer.email,
        phone: buyer.phone,
        address: buyer.address,
      },
    });
  } catch (error) {
    console.error("Error during buyer login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Seller Signup Function
export async function sellerSignup(req, res) {
  try {
    const { name, email, password, phone, address } = req.body;

    // Check if all fields are provided
    if (!email || !name || !password || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate Name
    if (typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name must be a non-empty string",
      });
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate Password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long, include at least one uppercase letter, and one number",
      });
    }

    // Validate Phone
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 10 digits",
      });
    }

    // Create a new user
    const newSeller = await Seller.create({
      name,
      email,
      password,
      phone,
      address,
    });

    const token = authToken(newSeller._id, "seller");

    res.cookie("jwt", token, {
      maxAge: 28 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: "Seller Sign up Successful",
      seller: {
        _id: newSeller._id,
        name: newSeller.name,
        email: newSeller.email,
        phone: newSeller.phone,
        address: newSeller.address,
      },
    });
  } catch (error) {
    if (error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        message: "email already exists,use a new one please",
      });
    }
    console.error("Error during buyer signup:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Seller Login Function
export async function sellerLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    // Find the buyer by email
    const seller = await Seller.findOne({ email }).select("+password");

    if (!seller || !(await seller.comparePW(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = authToken(seller._id, "seller");

    // Set cookie
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
      httpOnly: true, //prevents any XSS attacks
      sameSte: "strict", //prevents any CSRF attacks
      secure: false,
    });

    // Return success response (excluding sensitive data)
    res.status(200).json({
      success: true,
      message: "Seller Login Successful!",
      seller: {
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        address: seller.address,
      },
    });
  } catch (error) {
    console.error("Error during buyer login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function checkAuth(req, res) {
  try {
    if (!req.role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in.",
      });
    }
    if (req.role === "buyer") {
      res.status(200).json({
        success: true,
        buyer: req.buyer,
        role: req.role,
      });
    } else if (req.role === "seller") {
      res.status(200).json({
        success: true,
        seller: req.seller,
        role: req.role,
      });
    } else if (req.role === "admin") {
      res.status(200).json({
        success: true,
        admin: req.admin,
        role: req.role,
      });
    }
  } catch (error) {
    console.error("Error in /api/auth/me:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
