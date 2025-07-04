import { useEffect } from "react";
import usePublicState from "../../../GlobalState/publicState";
import IndividualProduct from "../../ProductLayout/Component/IndividualProduct";

const Products = () => {
  const { featureProducts, getFeaturedProducts } = usePublicState();

  useEffect(() => {
    getFeaturedProducts();
  }, [getFeaturedProducts]);
  return (
    <div className="w-full bg-sage p-5">
      {/* Featured Products Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-darkbrown p-5 bg-cream rounded-lg shadow-md w-max mx-auto">
          Featured Products
        </h2>
      </div>

      {/* Products Grid - Left Aligned */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featureProducts.map((product, index) => (
          <IndividualProduct key={index} details={product} route="feature" />
        ))}
      </div>
    </div>
  );
};

export default Products;
