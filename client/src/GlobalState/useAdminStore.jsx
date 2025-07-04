import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const useAdminStore = create((set) => ({
  unapprovedProducts: [],
  loadingUnapprovedProducts: false,

  loadingResponse: false,

  individualProduct: null,
  loadingIndividualProduct: true,

  rejectedProducts: [],
  loadingRejectedProducts: false,

  pendingPayments: [],

  loadingPaymentAccept: false,

  pendingSellerPayments: [],

  getUnapprovedProducts: async () => {
    try {
      set({ loadingUnapprovedProducts: true });
      const res = await axiosInstance.get("/admin/products/unapproved");

      set({ unapprovedProducts: res.data.products });
    } catch (error) {
      console.error("Error fetching unapproved products: ", error);
    } finally {
      set({ loadingUnapprovedProducts: false });
    }
  },

  getIndividualProductAdmin: async (productId) => {
    try {
      set({ loadingIndividualProduct: true });
      const response = await axiosInstance.get(`/admin/product/${productId}`);

      set({ individualProduct: response.data.product });
    } catch (error) {
      console.error("Failed to fetch individual product:", error);
    } finally {
      set({ loadingIndividualProduct: false });
    }
  },

  respondProduct: async (productId, status) => {
    try {
      set({ loadingResponse: true });
      const res = await axiosInstance.post(
        `/admin/product/respond/${productId}`,
        { status }
      );
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loadingResponse: false });
    }
  },

  getRejectedProducts: async () => {
    try {
      set({ loadingRejectedProducts: true });
      const res = await axiosInstance.get("/admin/products/rejected");

      set({ rejectedProducts: res.data.products });
    } catch (error) {
      console.error("Error fetching unapproved products: ", error);
    } finally {
      set({ loadingRejectedProducts: false });
    }
  },

  getPendingPayments: async () => {
    try {
      const res = await axiosInstance.get("admin/payment/pending");
      set({ pendingPayments: res.data.payments });
    } catch (error) {
      console.log("Error in fetching pending payments: ", error);
    }
  },

  acceptPayment: async (paymentId) => {
    try {
      set({ loadingPaymentAccept: true });
      const res = await axiosInstance.post(`admin/payment/accept/${paymentId}`);

      set((state) => ({
        pendingPayments: state.pendingPayments.filter(
          (payment) => payment._id !== paymentId
        ),
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ loadingPaymentAccept: false });
    }
  },

  getPendingSellerPayments: async () => {
    try {
      const res = await axiosInstance.get("admin/payment/seller/pending");
      set({ pendingSellerPayments: res.data.payments });
    } catch (error) {
      console.log("Error in fetching pending seller payments: ", error);
    }
  },

  payToSeller: async (paymentId) => {
    try {
      const res = await axiosInstance.post(
        `admin/payment/seller/accept/${paymentId}`
      );

      set((state) => ({
        pendingSellerPayments: state.pendingSellerPayments.filter(
          (payment) => payment._id !== paymentId
        ),
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },
}));
