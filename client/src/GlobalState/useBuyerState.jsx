import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const useBuyerStore = create((set) => ({
  groupedOrders: [],

  getOrders: async () => {
    try {
      const res = await axiosInstance.get("/buyer/orders");

      set({ groupedOrders: res.data.groupedOrders });
    } catch (error) {
      console.log(error);
    }
  },
}));
