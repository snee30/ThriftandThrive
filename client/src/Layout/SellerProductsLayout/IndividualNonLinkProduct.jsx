import sellerState from "../../GlobalState/sellerState";

const IndividualNonLinkProduct = ({ details, status = "" }) => {
  const images =
    Array.isArray(details.productImages) && details.productImages.length > 0
      ? details.productImages
      : [{ url: "/product-images/nails.png", public_id: "default" }];

  const uniqueId = details._id;
  const { deleteProduct } = sellerState();

  return (
    <div className="pt-5 bg-white rounded-2xl shadow-md overflow-hidden border border-sage hover:shadow-lg transition duration-300">
      {/* Carousel */}
      <div className="carousel w-full h-60 relative bg-white flex items-center justify-center">
        {images.map((image, index) => (
          <div
            key={image.public_id || index}
            id={`slide-${uniqueId}-${index}`}
            className="carousel-item relative w-full h-60 flex items-center justify-center"
          >
            <img
              src={image.url}
              alt={`product-${index}`}
              className="max-h-full max-w-full object-contain transition duration-300"
            />

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <div
                className="absolute left-0 right-0 top-1/2 flex justify-between px-4 transform -translate-y-1/2"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={`#slide-${uniqueId}-${
                    (index - 1 + images.length) % images.length
                  }`}
                  className="btn btn-sm btn-circle bg-white text-[var(--sage)] border border-[var(--darksage)] shadow hover:scale-110 transition"
                >
                  ❮
                </a>
                <a
                  href={`#slide-${uniqueId}-${(index + 1) % images.length}`}
                  className="btn btn-sm btn-circle bg-white text-[var(--sage)] border border-[var(--darksage)] shadow hover:scale-110 transition"
                >
                  ❯
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Product Info */}
      <div className="p-4 ">
        <h3 className="text-xl font-semibold text-[var(--darkgreen)] mb-2">
          {details.name}
        </h3>
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-medium text-gray-700">Category:</span>{" "}
          {details.category}
        </p>
        <p className="text-lg font-bold text-gray-800 mb-1">
          Rs. {details.price}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-medium">Condition:</span> {details.condition}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Negotiable:</span>{" "}
          {details.negotiable ? "Yes" : "No"}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Status:</span>{" "}
          <span
            className={`${details.status === "rejected" ? "text-red-700" : ""}`}
          >
            {details.status}
          </span>
        </p>
        {!status && (
          <button
            className="mt-3 w-full bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={() => deleteProduct(details._id)}
          >
            Delete Product
          </button>
        )}
      </div>
    </div>
  );
};

export default IndividualNonLinkProduct;
