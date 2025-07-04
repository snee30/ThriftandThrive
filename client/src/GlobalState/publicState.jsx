import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

const usePublicState = create((set) => ({
  // Public state variables
  products: [],
  individualProduct: null,
  loadingIndividualProduct: true,
  selectedCategory: "",

  featureProducts: [],

  getProducts: async () => {
    try {
      const response = await axiosInstance.get("/public/all-products");

      set({ products: response.data.products });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },

  getProductsByCategory: async (category) => {
    try {
      const response = await axiosInstance.get(`/public/category/${category}`);
      set({
        products: response.data.products,
      });
    } catch (error) {
      console.log("Failed to fetch products by category:", error);
    }
  },

  getProductsBySearch: async (query, category) => {
    try {
      let url = `/public/search?query=${encodeURIComponent(query)}`;
      if (category && category !== "") {
        url += `&category=${encodeURIComponent(category)}`;
      }
      const response = await axiosInstance.get(url);
      set({ products: response.data.products });
    } catch (error) {
      console.error("Failed to search products:", error);
    }
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  getIndividualProduct: async (productId) => {
    try {
      set({ loadingIndividualProduct: true });
      const response = await axiosInstance.get(`/public/product/${productId}`);

      set({ individualProduct: response.data.product });
    } catch (error) {
      console.error("Failed to fetch individual product:", error);
    } finally {
      set({ loadingIndividualProduct: false });
    }
  },

  getFeaturedProducts: async () => {
    try {
      const res = await axiosInstance.get("/public/featured-products");
      set({ featureProducts: res.data.products });
    } catch (error) {
      console.log("Error fetching feature products: ", error);
    }
  },
}));

export default usePublicState;
