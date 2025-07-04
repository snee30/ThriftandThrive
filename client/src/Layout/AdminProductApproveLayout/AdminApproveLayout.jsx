import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAdminStore } from "../../GlobalState/useAdminStore";

const AdminApproveLayout = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    getIndividualProductAdmin,
    individualProduct,
    loadingIndividualProduct,
  } = useAdminStore();

  const { respondProduct, loadingResponse } = useAdminStore();

  useEffect(() => {
    getIndividualProductAdmin(productId);
  }, [productId, getIndividualProductAdmin]);

  const handleApproval = async (status) => {
    await respondProduct(individualProduct._id, status);
    navigate("/admin/dashboard");
  };

  if (loadingIndividualProduct) {
    return <div>Loading....</div>;
  }

  return (
    <div className="min-h-screen bg-sage flex justify-center items-center p-6 pt-35 md:pt-0">
      {individualProduct ? (
        <div className="bg-base-100 rounded-xl shadow-xl p-6 w-full max-w-5xl flex flex-col md:flex-row gap-6">
          {/* Left: Image Carousel */}
          <div className="w-full md:w-5/12">
            <div className="carousel w-full rounded-lg">
              {individualProduct.productImages?.map((img, index) => (
                <div
                  id={`slide${index}`}
                  className="carousel-item relative w-full "
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
            <div className="flex items-center gap-10">
              <button
                onClick={() => handleApproval("approved")}
                className={`btn mt-6 w-fit bg-darksage border-0 shadow-none text-white ${
                  loadingResponse
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-darksage cursor-pointer"
                }`}
              >
                Approve
              </button>
              <button
                onClick={() => handleApproval("rejected")}
                className={`btn mt-6 w-fit bg-darksage border-0 shadow-none text-white ${
                  loadingResponse
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-red-800 cursor-pointer"
                }`}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">Loading product...</p>
      )}
    </div>
  );
};

export default AdminApproveLayout;
