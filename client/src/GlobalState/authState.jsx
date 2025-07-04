import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInstance";
import useCartStore from "./useCartStore";

export const authState = create((set) => ({
  user: null,
  role: "",
  loading: false,
  checkAuthLoading: true,

  signup: async (data, role) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post(`/auth/${role}/signup`, data);
      set({
        user:
          role === "buyer"
            ? response.data.buyer
            : role === "seller"
            ? response.data.seller
            : response.data.admin,

        role: role,
      });
      toast.success("Signup Successful :)");
    } catch (error) {
      toast.error(error.response.data.message || "Server Error!!!");
      console.log(error.response.data);
    } finally {
      set({ loading: false });
    }
  },

  login: async (data, role) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post(`/auth/${role}/login`, data);
      set({
        user:
          role === "buyer"
            ? response.data.buyer
            : role === "seller"
            ? response.data.seller
            : response.data.admin,
        role: role,
      });
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.response.data.message || "Server Error!!!");
      console.log(error.response.data);
    }
    set({ loading: false });
  },

  checkAuth: async () => {
    try {
      set({ checkAuthLoading: true });
      const res = await axiosInstance.get("/auth/me");

      if (res.data.buyer) {
        set({
          user: res.data.buyer,
          role: "buyer",
        });
      } else if (res.data.seller) {
        set({
          user: res.data.seller,
          role: "seller",
        });
      } else if (res.data.admin) {
        set({ user: res.data.admin, role: "admin" });
      } else {
        set({ user: {}, role: "" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ checkAuthLoading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null, role: "" });
      useCartStore.getState().clearCart();
      toast.success("Logout Successful");
    } catch (error) {
      toast.error(error.response.data.message || "Server Error!!!");
      console.log(error.response.data);
    }
  },
}));
