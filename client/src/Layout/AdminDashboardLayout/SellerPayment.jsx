import { Link } from "react-router-dom";
import { useAdminStore } from "../../GlobalState/useAdminStore";
import { useEffect } from "react";

const SellerPayment = () => {
  const { getPendingSellerPayments, pendingSellerPayments, payToSeller } =
    useAdminStore();

  useEffect(() => {
    getPendingSellerPayments();
  }, [getPendingSellerPayments]);

  const payButtonHandler = (paymentId) => {
    payToSeller(paymentId);
  };

  return (
    <div className="pt-35 px-6 mx-auto bg-sage min-h-screen w-100%">
      {/* Heading and Navigation */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Link
          to="/admin/dashboard"
          className="text-xl text-cream h-max font-medium bg-brown px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
        >
          Dashboard
        </Link>
        <h1 className="text-3xl text-forestgreen font-bold bg-cream text-center mt-6 md:mt-0 rounded-lg p-4 shadow-md w-max mx-auto md:mx-0">
          Pending Seller Payments
        </h1>
        <Link
          to="/admin/rejected-products"
          className="text-xl text-cream h-max font-medium bg-brown px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
        >
          View Rejected Products
        </Link>
      </div>
      {/* Payment Cards */}
      {pendingSellerPayments.length === 0 ? (
        <div className="bg-cream text-[#7f5539] py-20 px-8 rounded-xl shadow-lg text-center max-w-2xl mx-auto pt-30">
          <p className="text-2xl font-semibold">
            No Pending Payments to Seller
          </p>
          <p className="text-md">
            All seller payments have been cleared or are under review.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-10">
          {pendingSellerPayments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white border border-[var(--lightborder)] rounded-xl p-6 shadow hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                {/* Seller and Product Info */}
                <div>
                  <h2 className="text-gray-700 text-sm">
                    Payment to:{" "}
                    <span className="font-semibold text-base">
                      {payment?.seller?.name}
                    </span>
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    For Product:{" "}
                    <span className="font-medium text-gray-800">
                      {payment?.orderItem?.product?.name}
                    </span>
                  </p>
                </div>
                {/* Product Image */}
                {payment?.orderItem?.product?.imageUrl && (
                  <img
                    src={payment.orderItem.product.imageUrl}
                    alt="product"
                    className="w-24 h-24 object-cover rounded border"
                  />
                )}
              </div>
              {/* Amount and Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                <div className="text-xl font-bold text-[var(--forestgreen)]">
                  Rs. {payment.amount.toLocaleString()}
                </div>
                <button
                  onClick={() => payButtonHandler(payment._id)}
                  className="bg-[var(--sage)] text-[var(--darkgreen)] px-5 py-2 rounded-lg font-semibold hover:bg-[var(--darksage)] transition"
                >
                  Pay to Seller
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerPayment;
