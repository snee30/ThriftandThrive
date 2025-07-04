import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

const sellerState = create((set) => ({
  loading: false,

  allProducts: [],

  pendingProducts: [],
  soldProducts: [],

  addProduct: async (data) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("seller/add-product", data);
      toast.success(res.data.message);
      return true;
    } catch (error) {
      toast.error(error.response.data.message || "Server Error!!!");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  getProductStatus: async () => {
    try {
      const res = await axiosInstance.get("/seller/product-status");
      set({ allProducts: res.data.products });
    } catch (error) {
      console.log(error);
    }
  },

  updateProductStatus: async (productId, updateStatus) => {
    try {
      await axiosInstance.post(`/seller/update-status/${productId}`, {
        updateStatus,
      });

      await sellerState.getState().getProductStatus();
      toast.success("Successfully Updated the Status");
    } catch (error) {
      console.log("error in uodate Product Status", error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  },

  getPendingProducts: async () => {
    try {
      const res = await axiosInstance.get("/seller/products/pending");
      set({ pendingProducts: res.data.products });
    } catch (error) {
      console.log(error);
    }
  },

  getSoldProducts: async () => {
    try {
      const res = await axiosInstance.get("/seller/products/sold");
      set({ soldProducts: res.data.products });
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (productId) => {
    try {
      const res = await axiosInstance.delete(
        `/seller/update-status/delete/${productId}`
      );

      toast.success(res.data.message);
      set((state) => ({
        allProducts: state.allProducts.filter(
          (product) => product._id !== productId
        ),

        pendingProducts: state.pendingProducts.filter(
          (product) => product._id !== productId
        ),
      }));
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  },
}));

export default sellerState;
