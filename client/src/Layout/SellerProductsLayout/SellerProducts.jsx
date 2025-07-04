import { useState, useEffect } from "react";
import sellerState from "../../GlobalState/sellerState";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";

const SellerProducts = () => {
  const { getProductStatus, allProducts, updateProductStatus, deleteProduct } =
    sellerState();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProductStatus();
  }, [getProductStatus]);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleStatusChange = (e) => {
    setSelectedProduct((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  const handleUpdateStatus = () => {
    if (selectedProduct) {
      updateProductStatus(selectedProduct._id, selectedProduct.status);
      closeModal();
    }
  };

  return (
    <div className="bg-sage min-h-screen px-6 py-28">
      {/* Page Heading and Links */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-[var(--forestgreen)] bg-[var(--cream)] text-center mt-6 rounded-xl p-4 shadow-md w-max mx-auto md:mx-0">
          Seller Products
        </h1>

        <div className="flex gap-4 mt-4 md:mt-6 justify-center md:justify-end">
          <Link
            to="/seller/products/pending"
            className="text-xl text-cream font-medium bg-brown px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
          >
            Pending / Rejected Products
          </Link>
          <Link
            to="/seller/products/sold"
            className="text-xl text-cream font-medium bg-brown px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
          >
            Your Sold Products
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allProducts.length === 0 ? (
          <div className="text-center text-gray-600 col-span-full">
            You have no products. Start by adding a new product.
          </div>
        ) : (
          allProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 border flex flex-col justify-between border-darksage hover:shadow-lg transition duration-200"
            >
              <div>
                <div className="w-full h-64 bg-[#f4f4f4] rounded-lg flex items-center justify-center mb-4">
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-forestgreen mb-1">
                    {product.name}
                  </h2>
                  <p className="text-gray-800 font-medium text-sm mb-1">
                    Rs. {product.price}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Status: <span className="capitalize">{product.status}</span>
                  </p>
                </div>
              </div>

              {product.status === "available" && (
                <button
                  className="mt-3 w-full bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-500 transition h-10"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete Product
                </button>
              )}

              {product.status !== "available" &&
                product.status !== "pending payment" && (
                  <div className="mt-3 text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-medium">Delivery Location:</span>{" "}
                      {product.delivery_location}
                    </p>
                    <p>
                      <span className="font-medium">Buyer Phone:</span>{" "}
                      {product.buyer_phone}
                    </p>
                    <button
                      onClick={() => openModal(product)}
                      className="mt-3 w-full bg-forestgreen text-white px-4 py-2 rounded-md hover:bg-green-700 transition h-10"
                    >
                      Update Status
                    </button>
                  </div>
                )}
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="pt-30 fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-2 bg-red-500 hover:bg-red-700 text-white rounded-full  transition"
            >
              <MdOutlineClose />
            </button>

            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <img
                src={selectedProduct.image || "https://via.placeholder.com/300"}
                alt={selectedProduct.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <h2 className="text-xl font-bold mb-2 text-forestgreen text-center">
              {selectedProduct.name}
            </h2>

            <div className="text-gray-700 text-sm space-y-1 mb-4">
              <p>
                <strong>Buyer Phone:</strong> {selectedProduct.buyer_phone}
              </p>
              <p>
                <strong>Delivery Location:</strong>{" "}
                {selectedProduct.delivery_location}
              </p>
              <p>
                <strong>Current Status:</strong>{" "}
                <span className="capitalize">{selectedProduct.status}</span>
              </p>
            </div>

            <label
              htmlFor="status-dropdown"
              className="block font-medium text-sm mb-1"
            >
              Update Status:
            </label>
            <select
              id="status-dropdown"
              value={selectedProduct.status}
              onChange={handleStatusChange}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            >
              <option value="default">Choose Status</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>

            <button
              onClick={handleUpdateStatus}
              className="bg-forestgreen hover:bg-green-700 text-white font-semibold px-4 py-2 w-full rounded transition"
            >
              Confirm Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
