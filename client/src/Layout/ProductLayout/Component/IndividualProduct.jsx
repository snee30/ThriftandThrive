import { Link } from "react-router-dom";

const IndividualProduct = ({ details, role = "", route = "" }) => {
  const images =
    Array.isArray(details.productImages) && details.productImages.length > 0
      ? details.productImages
      : [{ url: "/product-images/nails.png", public_id: "default" }];

  const uniqueId = details._id;

  return (
    <Link
      to={
        role === "admin"
          ? `/admin/product/${details._id}`
          : `/product/${details._id}`
      }
      className={`${
        !route ? "bg-white" : "bg-white"
      }  rounded-lg shadow-md overflow-hidden border-darksage`}
    >
      {/* DaisyUI Carousel */}
      <div className="carousel w-full h-60 relative">
        {images.map((image, index) => (
          <div
            key={image.public_id || index}
            id={`slide-${uniqueId}-${index}`}
            className="carousel-item relative w-full"
          >
            <img
              src={image.url}
              alt={`product-${index}`}
              className="w-full h-60 object-contain"
            />
            {images.length > 1 && (
              <div
                className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <a
                  href={`#slide-${uniqueId}-${
                    (index - 1 + images.length) % images.length
                  }`}
                  className="btn btn-circle"
                >
                  ❮
                </a>
                <a
                  href={`#slide-${uniqueId}-${(index + 1) % images.length}`}
                  className="btn btn-circle mx-auto w-max shadow-md mb-4 bg-cream text-center mt-10 rounded-lg p-4"
                >
                  ❯
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{details.name}</h3>
        <p className="text-gray-600 text-sm mb-1">
          Category: {details.category}
        </p>
        <p className="text-gray-800 font-bold mb-1">Rs.{details.price}</p>
        <p className="text-sm text-gray-500 mb-1">
          Condition: {details.condition}
        </p>
        <p className="text-sm text-gray-500">
          Negotiable: {details.negotiable ? "Yes" : "No"}
        </p>
      </div>
    </Link>
  );
};

export default IndividualProduct;
