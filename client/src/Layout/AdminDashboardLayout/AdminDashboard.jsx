import { useAdminStore } from "../../GlobalState/useAdminStore";
import { useEffect } from "react";
import IndividualProduct from "../ProductLayout/Component/IndividualProduct";
import { Link } from "react-router-dom";
import PaymentList from "./PaymentList";
import { authState } from "../../GlobalState/authState";

const AdminDashboard = () => {
  const {
    unapprovedProducts,
    loadingUnapprovedProducts,
    getUnapprovedProducts,
    getPendingPayments,
  } = useAdminStore();

  const { user } = authState();

  useEffect(() => {
    getUnapprovedProducts();
    getPendingPayments();
  }, [getUnapprovedProducts, getPendingPayments]);

  if (loadingUnapprovedProducts) {
    return (
      <div className="flex h-40 w-full justify-center items-center text-forestgreen text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="pt-28 px-6 w-full mx-auto min-h-screen bg-sage">
      {/* Welcome Message */}
      <h1 className="text-3xl font-bold text-[var(--forestgreen)] bg-[var(--cream)] text-center mt-6 rounded-xl p-4 shadow-md w-max mx-auto">
        Welcome {user.name.split(" ")[0]} to your Dashboard
      </h1>

      {/* Unapproved Products Section */}
      <div className="mt-12">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-brown bg-[var(--cream)] rounded-lg p-3 shadow">
            Unapproved Products
          </h2>
          <Link
            to="/admin/rejected-products"
            className="text-xl  text-cream font-medium bg-brown px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
          >
            View Rejected Products
          </Link>
          <Link
            to="/admin/dashboard/seller-payments"
            className="text-xl  text-cream font-medium bg-brown px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
          >
            View Pending Seller Payments
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {unapprovedProducts.length === 0 ? (
            <div className="text-forestgreen text-base col-span-full">
              No products pending at the moment.
            </div>
          ) : (
            unapprovedProducts.map((product, index) => (
              <IndividualProduct key={index} details={product} role="admin" />
            ))
          )}
        </div>
      </div>

      {/* Payments Section */}

      <PaymentList />
    </div>
  );
};

export default AdminDashboard;
