// IndividualFeatureProduct.jsx
import React from "react";
import { CiShoppingCart } from "react-icons/ci";

const IndividualFeatureProduct = ({ name, price, image }) => {
  return (
    <div className=" bg-sage p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-60">
      <img
        src={image}
        alt={name}
        className="w-full h-60 object-fit-cover mb-3 "
      />
      <h3 className="font-semibold text-lg text-forestgreen">{name}</h3>
      <p className="font-medium text-forestgreen">{price}</p>
      <button className="mt-2 text-white flex items-center gap-2">
        Add to Cart
        <CiShoppingCart className="size-6" />
      </button>
    </div>
  );
};

export default IndividualFeatureProduct;
