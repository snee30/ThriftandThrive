// checks if the user is logged in (authentication).
// Often used to protect routes like: “Only logged-in users can see orders.”
import jwt from "jsonwebtoken";
import Buyer from "../Models/buyerModel.js";
import Seller from "../Models/sellerModel.js";
import Admin from "../Models/adminModel.js";

export const isAuth = async (req, res, next) => {
  try {
    // Grab the token cookie from the user
    const token = req.cookies.jwt;

    // Condition if there is no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorization as token is empty",
      });
    }

    //  Verify the token
    const decode = jwt.verify(token, process.env.JWTSECRET);

    // Condition if the token cannot be verified
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token is provided",
      });
    }

    if (decode.role === "buyer") {
      const currentBuyer = await Buyer.findById(decode.id);
      if (currentBuyer) {
        req.buyer = {
          _id: currentBuyer._id,
          name: currentBuyer.name,
          email: currentBuyer.email,
          phone: currentBuyer.phone,
          address: currentBuyer.address,
        };
        req.role = "buyer";
      } else {
        return res.status(404).json({
          success: false,
          message: "Token is not associated to any seller",
        });
      }
    } else if (decode.role === "seller") {
      const currentSeller = await Seller.findById(decode.id);
      if (currentSeller) {
        req.seller = {
          _id: currentSeller._id,
          name: currentSeller.name,
          email: currentSeller.email,
          phone: currentSeller.phone,
          address: currentSeller.address,
        };
        req.role = "seller";
      } else {
        return res.status(404).json({
          success: false,
          message: "Token is not associated to any buyer",
        });
      }
    } else if (decode.role === "admin") {
      const currentAdmin = await Admin.findById(decode.id);
      if (currentAdmin) {
        req.admin = {
          _id: currentAdmin._id,
          name: currentAdmin.name,
          email: currentAdmin.email,
        };
        req.role = "admin";
      } else {
        return res.status(404).json({
          success: false,
          message: "Token is not associated to any admin",
        });
      }
    }

    next();
  } catch (err) {
    console.log(`Error in auth middleware: ${err}`);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - Invalid token",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

export const isBuyer = async (req, res, next) => {
  try {
    // Grab the token cookie from the user
    const token = req.cookies.jwt;

    // Condition if there is no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorization as token is empty",
      });
    }

    //  Verify the token
    const decode = jwt.verify(token, process.env.JWTSECRET);

    // Condition if the token cannot be verified
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token is provided",
      });
    }

    if (decode.role === "buyer") {
      const currentBuyer = await Buyer.findById(decode.id);
      if (currentBuyer) {
        req.buyer = {
          _id: currentBuyer._id,
          name: currentBuyer.name,
          email: currentBuyer.email,
          phone: currentBuyer.phone,
          address: currentBuyer.address,
        };
        req.role = "buyer";
      } else {
        return res.status(404).json({
          success: false,
          message: "Token is not associated to any seller",
        });
      }
    }
    next();
  } catch (err) {
    console.log(`Error in auth middleware: ${err}`);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - Invalid token",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

export const isSeller = async (req, res, next) => {
  try {
    // Grab the token cookie from the user
    const token = req.cookies.jwt;

    // Condition if there is no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorization as token is empty",
      });
    }

    //  Verify the token
    const decode = jwt.verify(token, process.env.JWTSECRET);

    // Condition if the token cannot be verified
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token is provided",
      });
    }

    if (decode.role === "seller") {
      const currentSeller = await Seller.findById(decode.id);
      if (currentSeller) {
        req.seller = {
          _id: currentSeller._id,
          name: currentSeller.name,
          email: currentSeller.email,
          phone: currentSeller.phone,
          address: currentSeller.address,
        };
        req.role = "seller";
      } else {
        return res.status(404).json({
          success: false,
          message: "Token is not associated to any buyer",
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: "Access denied - Not a seller",
      });
    }
    next();
  } catch (err) {
    console.log(`Error in auth middleware: ${err}`);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - Invalid token",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    // Grab the token cookie from the user
    const token = req.cookies.jwt;

    // Condition if there is no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorization as token is empty",
      });
    }

    //  Verify the token
    const decode = jwt.verify(token, process.env.JWTSECRET);

    // Condition if the token cannot be verified
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token is provided",
      });
    }

    if (decode.role === "admin") {
      const currentAdmin = await Admin.findById(decode.id);
      if (currentAdmin) {
        req.admin = {
          _id: currentAdmin._id,
          name: currentAdmin.name,
          email: currentAdmin.email,
        };
        req.role = "admin";
      } else {
        return res.status(404).json({
          success: false,
          message: "Token is not associated to any buyer",
        });
      }
    }
    next();
  } catch (err) {
    console.log(`Error in auth middleware: ${err}`);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - Invalid token",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
