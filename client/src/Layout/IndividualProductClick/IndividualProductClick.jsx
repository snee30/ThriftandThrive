import { useParams } from "react-router-dom";
import usePublicState from "../../GlobalState/publicState";
import useCartStore from "../../GlobalState/useCartStore"; // import your zustand store
import { useEffect } from "react";
import { authState } from "../../GlobalState/authState";
import toast from "react-hot-toast";

const IndividualProductClick = () => {
  const { productId } = useParams();
  const { getIndividualProduct, individualProduct } = usePublicState();
  const { addToCart, loading } = useCartStore();
  const { role } = authState();

  useEffect(() => {
    getIndividualProduct(productId);
  }, [productId, getIndividualProduct]);

  const handleAddToCart = () => {
    if (role === "buyer") {
      addToCart(individualProduct);
    } else {
      toast.error("You need to sign in as a buyer to add product to the cart");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-sage pt-35 md:pt-0">
      {individualProduct ? (
        <div className="bg-base-100 rounded-xl shadow-xl p-6 w-full max-w-5xl flex flex-col md:flex-row gap-6">
          {/* Left: Image Carousel */}
          <div className="w-full md:w-5/12">
            <div className="carousel w-full rounded-lg">
              {individualProduct.productImages?.map((img, index) => (
                <div
                  id={`slide${index}`}
                  className="carousel-item relative w-full"
                  key={index}
                >
                  <img
                    src={img.url}
                    className="w-full h-80 object-contain"
                    alt={`Product ${index}`}
                  />
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
                    <a
                      href={`#slide${
                        (index - 1 + individualProduct.productImages.length) %
                        individualProduct.productImages.length
                      }`}
                      className="btn btn-circle"
                    >
                      ❮
                    </a>
                    <a
                      href={`#slide${
                        (index + 1) % individualProduct.productImages.length
                      }`}
                      className="btn btn-circle"
                    >
                      ❯
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full md:w-7/12 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {individualProduct.name}
              </h1>
              <p className="text-lg text-success font-semibold mb-4">
                Rs.{individualProduct.price}/-
              </p>

              <div className="text-sm text-gray-700 mb-3 space-y-1">
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {individualProduct.category}
                </p>
                <p>
                  <span className="font-semibold">Condition:</span>{" "}
                  {individualProduct.condition}
                </p>
                <p>
                  <span className="font-semibold">Negotiable:</span>{" "}
                  {individualProduct.negotiable ? "Yes" : "No"}
                </p>
              </div>

              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">Description:</p>
                <p>{individualProduct.description}</p>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`btn mt-6 w-fit bg-darksage border-0 shadow-none text-white ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-darksage cursor-pointer"
              }`}
            >
              {loading ? "Adding to Cart..." : "Add to Cart"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">Loading product...</p>
      )}
    </div>
  );
};

export default IndividualProductClick;
