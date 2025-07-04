import { useState } from "react";
import useCartStore from "../../GlobalState/useCartStore";
import PaymentForm from "./PaymentForm"; // adjust path as needed

const Checkout = () => {
  const { cartItems } = useCartStore();
  const [showForm, setShowForm] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="pt-35 px-4 flex justify-center bg-sage min-h-screen">
      {" "}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 h-max">
        <h1 className="text-2xl font-bold text-[#3e2723] mb-6 text-center">
          Checkout
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-[#7f5539] font-medium">
            Your cart is empty.
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-cream p-5 mb-5 rounded-2xl shadow-md flex items-center justify-between"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-contain rounded"
              />
              <div className="flex-1 px-4">
                <h2 className="text-[#3e2723] font-medium">{item.name}</h2>
              </div>
              <p className="text-[#7f5539] font-semibold text-sm">
                Rs. {item.price}
              </p>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <>
            <div className="mt-6 text-right text-lg font-semibold text-[#3e2723]">
              Total Price: Rs. {subtotal}
            </div>
            <div className="mt-6 text-right text-lg font-semibold text-[#3e2723]">
              Delivery: Rs. 100
            </div>
            <div className="mt-6 text-right text-lg font-semibold text-[#3e2723]">
              Grand Total: Rs. {subtotal + 100}
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="mt-6 w-full bg-[#b08968] hover:bg-[#a1754d] text-white py-2 rounded-lg font-semibold transition duration-300"
            >
              Proceed to Payment
            </button>
          </>
        )}

        {showForm && (
          <PaymentForm closeModal={() => setShowForm(false)} price={subtotal} />
        )}
      </div>
    </div>
  );
};

export default Checkout;
