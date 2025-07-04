import { useEffect, useRef, useState } from "react";
import useCartStore from "../../GlobalState/useCartStore";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ closeModal, price }) => {
  const formRef = useRef();
  const navigate = useNavigate();
  const { checkout } = useCartStore();

  const [formData, setFormData] = useState({
    delivery_location: "",
    buyer_phone: "",
    transactionId: "",
  });

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [closeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = checkout(formData);
    if (res) {
      navigate("/buyer/orders");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-sage pt-10 pb-5 bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center pt-[6rem] px-4">
        <div
          ref={formRef}
          className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg"
        >
          <h2 className="text-xl font-semibold text-center text-[#3e2723] mb-4">
            Confirm Order & Payment
          </h2>

          <form onSubmit={handleSubmit}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Delivery Location
            </label>
            <input
              type="text"
              name="delivery_location"
              value={formData.delivery_location}
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-[#b08968]"
              required
            />

            <label className="block mb-1 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              minLength={10}
              maxLength={10}
              name="buyer_phone"
              value={formData.buyer_phone}
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-[#b08968]"
              required
            />

            <label className="block text-center mb-2 text-sm font-medium text-gray-700">
              Scan to Pay
            </label>
            <img
              src="/payment-qr.png"
              alt="QR Code"
              className="mx-auto w-40 h-45 mb-4"
            />

            <label className="block mb-1 text-sm font-medium text-gray-700">
              Transaction ID
            </label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-[#b08968]"
              required
            />

            <p className="text-right text-[#3e2723] font-semibold mb-4">
              Total Amount: Rs. {price}
            </p>

            <p className="text-right text-[#3e2723] font-semibold mb-4">
              Delivery Charge: Rs. 100
            </p>
            <p className="text-right text-[#3e2723] font-semibold mb-4">
              Grand Total: Rs. {price + 100}
            </p>

            <button
              type="submit"
              className="w-full bg-[#b08968] hover:bg-[#a1754d] text-white py-2 rounded-lg font-semibold transition duration-300"
            >
              Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
