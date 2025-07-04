import { useRef, useCallback } from "react";
import { FiFilter } from "react-icons/fi";
import usePublicState from "../../GlobalState/publicState";

const CategoryFilter = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    getProductsByCategory,
    getProducts,
    getProductsBySearch,
  } = usePublicState();

  const categories = [
    "Tops",
    "Bottoms",
    "Dress",
    "Shoes",
    "Bags",
    "Accessories",
    "Others",
  ];

  // Debounce logic
  const debounceTimeout = useRef(null);

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        if (value.trim() === "") {
          if (selectedCategory === "") {
            getProducts();
          } else {
            getProductsByCategory(selectedCategory);
          }
        } else {
          getProductsBySearch(value.trim(), selectedCategory); // Pass category!
        }
      }, 400);
    },
    [selectedCategory, getProducts, getProductsByCategory, getProductsBySearch]
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      getProducts();
    } else {
      getProductsByCategory(category);
    }
  };

  return (
    <div className="mb-6 bg-cream p-4 rounded-lg shadow-sm sticky top-20 z-10">
      <div className="flex items-center gap-2 mb-3">
        <FiFilter className="text-forestgreen text-lg" />
        <h2 className="text-lg font-semibold text-forestgreen">
          Filter Products
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            selectedCategory === ""
              ? "bg-forestgreen text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
          onClick={() => handleCategoryChange("")}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`capitalize px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-forestgreen text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search..."
          className="input focus:border-none"
          onChange={handleSearchChange}
        />
      </form>
    </div>
  );
};

export default CategoryFilter;
