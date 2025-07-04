import Product from "../Models/productModel.js";
import OrderItem from "../Models/orderItem.js";

export const getAllProducts = async (req, res) => {
  try {
    // Step 1: Get all purchased product IDs from OrderItem
    const orderedItems = await OrderItem.find({}, "product");
    const orderedProductIds = orderedItems.map((item) =>
      item.product.toString()
    );

    // Step 2: Find approved products that are NOT already ordered
    const products = await Product.find({
      status: "approved",
      _id: { $nin: orderedProductIds },
    }).select("name price productImages category condition negotiable");

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error(`Error fetching products: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.productId,
      status: "approved",
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

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const orderedItems = await OrderItem.find({}, "product");
    const orderedProductIds = orderedItems.map((item) =>
      item.product.toString()
    );

    // Step 2: Find approved products that are NOT already ordered
    const products = await Product.find({
      status: "approved",
      category: category,
      _id: { $nin: orderedProductIds },
    }).select("name price productImages category condition negotiable");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProductsBySearch = async (req, res) => {
  try {
    const { query, category } = req.query;
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Missing search query" });
    }

    // Get ordered product IDs
    const orderedItems = await OrderItem.find({}, "product");
    const orderedProductIds = orderedItems.map((item) =>
      item.product.toString()
    );

    // Build the filter object
    const filter = {
      status: "approved",
      _id: { $nin: orderedProductIds },
      name: { $regex: query, $options: "i" },
    };
    if (category && category !== "") {
      filter.category = category;
    }

    const products = await Product.find(filter).select(
      "name price productImages category condition negotiable"
    );

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    // Step 1: Get all purchased product IDs from OrderItem
    const orderedItems = await OrderItem.find({}, "product");
    const orderedProductIds = orderedItems.map((item) =>
      item.product.toString()
    );

    // Step 2: Find approved products that are NOT already ordered and get random 5
    const products = await Product.aggregate([
      { $match: { status: "approved", _id: { $nin: orderedProductIds } } },
      { $sample: { size: 5 } },
    ]);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching featured products: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
