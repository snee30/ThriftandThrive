import React, { useEffect } from "react";
import sellerState from "../../GlobalState/sellerState";
import IndividualNonLinkProduct from "./IndividualNonLinkProduct";

const SoldProducts = () => {
  const { getSoldProducts, soldProducts } = sellerState();

  useEffect(() => {
    getSoldProducts();
  }, []);

  return (
    <div className="min-h-screen w-full bg-sage pt-32 px-4 pb-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-forestgreen text-center bg-cream p-4 rounded-lg shadow mb-10">
          Sold Products
        </h1>

        {soldProducts.length === 0 ? (
          <div className="text-center text-gray-600 text-lg bg-white p-6 rounded-xl shadow-md">
            You have no sold products yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {soldProducts.map((product, index) => (
              <IndividualNonLinkProduct
                details={product}
                key={index}
                status="sold"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SoldProducts;
