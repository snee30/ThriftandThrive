import React, { useEffect, useState, useCallback, useMemo } from "react";
import sellerState from "../../GlobalState/sellerState";
import IndividualNonLinkProduct from "./IndividualNonLinkProduct";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

const PendingProducts = () => {
  const { getPendingProducts, pendingProducts } = sellerState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const fetchPendingProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await getPendingProducts();
    } catch (err) {
      console.error("Failed to fetch pending products:", err);
      setError(
        "Failed to load products. Please refresh the page or try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }, [getPendingProducts]);

  useEffect(() => {
    fetchPendingProducts();
  }, [fetchPendingProducts]);

  const filteredProducts = useMemo(() => {
    if (!pendingProducts) return [];
    switch (activeFilter) {
      case "pending":
        return pendingProducts.filter((p) => p.status === "pending");
      case "rejected":
        return pendingProducts.filter((p) => p.status === "rejected");
      default:
        return pendingProducts;
    }
  }, [pendingProducts, activeFilter]);

  const statusCounts = useMemo(() => {
    const counts = { all: 0, pending: 0, rejected: 0 };
    if (pendingProducts) {
      pendingProducts.forEach((product) => {
        counts.all++;
        counts[product.status] = (counts[product.status] || 0) + 1;
      });
    }
    return counts;
  }, [pendingProducts]);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center mt-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-forestgreen"></div>
    </div>
  );

  const ErrorMessage = ({ message }) => (
    <div className="text-center mt-20">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded max-w-md mx-auto">
        <div className="flex items-center justify-center gap-2">
          <FiAlertCircle className="text-xl" />
          <p>{message}</p>
        </div>
        <button
          onClick={fetchPendingProducts}
          className="mt-3 bg-forestgreen text-white px-4 py-2 rounded hover:bg-darkgreen transition"
        >
          Retry
        </button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center text-gray-600 text-lg mt-20 bg-cream p-8 rounded-lg shadow max-w-2xl mx-auto">
      <FiCheckCircle className="text-4xl mx-auto text-forestgreen mb-3" />
      <h3 className="text-xl font-semibold">No products found</h3>
      <p className="mt-2">
        {activeFilter === "all"
          ? "You have no pending or rejected products."
          : `You have no ${activeFilter} products.`}
      </p>
    </div>
  );

  const FilterTabs = () => (
    <div className="flex justify-center mb-8  ">
      <div className="flex space-x-1 bg-cream p-1 rounded-lg shadow-inner">
        {[
          { value: "all", label: "All", icon: <FiClock className="mr-1" /> },
          {
            value: "pending",
            label: "Pending",
            icon: <FiClock className="mr-1" />,
          },
          {
            value: "rejected",
            label: "Rejected",
            icon: <FiXCircle className="mr-1" />,
          },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center transition-colors ${
              activeFilter === tab.value
                ? "bg-forestgreen text-white shadow"
                : "text-gray-700 hover:bg-sage/50"
            }`}
          >
            {tab.icon}
            {tab.label} ({statusCounts[tab.value] || 0})
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-sage pt-32 px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-forestgreen bg-cream p-4 rounded-lg shadow">
            Product Approval Status
          </h1>
          <p className="text-forestgreen mt-3">
            {statusCounts.all > 0
              ? `Managing ${statusCounts.all} products under review`
              : "All your products are approved"}
          </p>
        </header>

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <FilterTabs />
            {filteredProducts.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <IndividualNonLinkProduct
                    key={product.id || product._id}
                    details={product}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PendingProducts;
