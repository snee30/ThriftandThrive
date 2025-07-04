import React from "react";
import productsdata from "./productsdata";
import IndividualProduct from "./IndividualProduct";

const ProductsList = () => {
  return (
    <div>
      {productsdata.map((product, index) => (
        <IndividualProduct key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductsList;
