import { useEffect } from "react";
import { useAdminStore } from "../../GlobalState/useAdminStore";
import IndividualProduct from "../ProductLayout/Component/IndividualProduct";
import { Link } from "react-router-dom";

const RejectedProducts = () => {
  const { getRejectedProducts, rejectedProducts, loadingRejectedProducts } =
    useAdminStore();

  useEffect(() => {
    getRejectedProducts();
  }, [getRejectedProducts]);

  return (
    <div className="pt-35 px-6  mx-auto bg-sage min-h-screen w-100%">
      {/* Heading and Navigation */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Link
          to="/admin/dashboard"
          className="text-xl text-cream h-max font-medium bg-brown px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
        >
          Dashboard
        </Link>

        <h1 className="text-3xl text-forestgreen font-bold bg-cream text-center mt-6 md:mt-0 rounded-lg p-4 shadow-md w-max mx-auto md:mx-0">
          Rejected Products
        </h1>

        <Link
          to="/admin/dashboard/seller-payments"
          className=" text-xl text-cream h-max font-medium bg-brown px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
        >
          View Pending Seller Payments
        </Link>
      </div>

      {loadingRejectedProducts ? (
        <div className="text-center text-[#7f5539] text-lg font-medium animate-pulse">
          Loading rejected items...
        </div>
      ) : rejectedProducts.length === 0 ? (
        <div className="bg-cream text-[#7f5539] py-20 px-8 rounded-xl shadow-lg text-center space-y-4 max-w-2xl mb-4 mx-auto pt-20">
          <div className="text-6xl">📦</div>
          <p className="text-2xl font-semibold">No Rejected Products Found</p>
          <p className="text-md">
            All items have been approved or are under review.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-10">
          {rejectedProducts.map((product, index) => (
            <IndividualProduct key={index} details={product} role="admin" />
          ))}
        </div>
      )}
    </div>
  );
};

export default RejectedProducts;
