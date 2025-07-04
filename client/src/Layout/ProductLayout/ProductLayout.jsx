import { useEffect } from "react";
import usePublicState from "../../GlobalState/publicState";
import IndividualProduct from "./Component/IndividualProduct";
import { FiAlertTriangle, FiPackage } from "react-icons/fi";
import CategoryFilter from "./CategoryFilter";

const ProductLayout = () => {
  const { products, loading, error, selectedCategory, getProducts } =
    usePublicState();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center my-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-forestgreen"></div>
    </div>
  );

  // Error Message Component
  const ErrorMessage = () => (
    <div className="text-center my-20">
      <div className="inline-flex items-center bg-red-50 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto border-l-4 border-red-500">
        <FiAlertTriangle className="mr-3 text-xl" />
        <div>
          <h3 className="font-medium">Error loading products</h3>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={getProducts}
            className="mt-3 bg-forestgreen text-white px-4 py-2 rounded-md text-sm hover:bg-darkgreen transition"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );

  // Empty State Component
  const EmptyState = () => (
    <div className="text-center my-20">
      <div className="inline-flex flex-col items-center bg-cream p-8 rounded-lg shadow-sm max-w-md mx-auto">
        <FiPackage className="text-4xl text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          {selectedCategory
            ? `No ${selectedCategory} products available`
            : "No products found"}
        </h3>
        <p className="text-gray-500 text-sm">
          {selectedCategory
            ? "Check back later or browse other categories"
            : "New products will be available soon"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="px-4 py-8 pt-30 bg-sage min-h-screen ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-cream p-4 rounded-lg shadow-md mb-6 text-center w-max mx-auto ">
          <h1 className="text-3xl font-bold text-forestgreen">
            {selectedCategory
              ? `${selectedCategory} Products`
              : "Our Collection"}
          </h1>
          {/* Removed the item count line completely */}
        </div>

        {/* Category Filter */}
        <CategoryFilter />

        {/* Product Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage />
        ) : products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <IndividualProduct key={product._id} details={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductLayout;
