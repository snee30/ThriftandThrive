import useCartStore from "../../../GlobalState/useCartStore";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useCartStore();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div>
      <div className="flex-none">
        <div className="dropdown dropdown-top lg:dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle hover:text-brown p-3 hover:scale-105 transition-transform duration-200"
          >
            <div className="indicator">
              <FaShoppingCart className="text-3xl text-darkbrown" />
              <span className="badge badge-sm indicator-item bg-brown text-white">
                {cartItems?.length || 0}
              </span>
            </div>
          </div>

          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-[#fdf8f3] p-0 z-1 w-70 shadow border-1 h-70 overflow-auto rounded-xl"
          >
            {cartItems.length === 0 ? (
              <div className="card-body">
                <h2 className="text-center text-lg font-semibold">
                  Your cart is empty
                </h2>
              </div>
            ) : (
              <>
                <div className="max-h-56 overflow-y-auto px-2 py-1">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className={`flex gap-2 p-2 items-center justify-between ${
                        index !== cartItems.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt=""
                          className="w-12 h-12 rounded-full object-contain"
                        />
                        <div>
                          <h1 className="text-base font-medium">{item.name}</h1>
                          <p className="text-sm">Price: Rs. {item.price}</p>
                        </div>
                      </div>
                      <button
                        className="btn btn-xs btn-circle bg-brown hover:bg-darkbrown text-white"
                        onClick={() => removeFromCart(item._id)}
                        title="Remove item"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="px-4 pt-3 border-t bg-[#fdf8f3] rounded-b-xl">
                  <div className="text-darkbrown font-semibold text-lg mb-2">
                    Subtotal: Rs. {subtotal}
                  </div>
                  <div className="card-actions">
                    <Link
                      to={"/checkout"}
                      className="btn bg-darkbrown text-white btn-block"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
