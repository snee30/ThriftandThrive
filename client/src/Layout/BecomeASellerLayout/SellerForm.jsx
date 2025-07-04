import { useState } from "react";
import sellerState from "../../GlobalState/sellerState";

const SellerForm = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [dressCondition, setDressCondition] = useState("");
  const [category, setCategory] = useState("");
  const [negotiable, setNegotiable] = useState(false);
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]); // Base64 strings
  const [imagePreviews, setImagePreviews] = useState([]); // Preview URLs
  const [error, setError] = useState("");

  //importing
  const { addProduct, loading } = sellerState();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Limit to 5 images for example (optional)
    if (files.length + images.length > 10) {
      setError("You can upload a maximum of 10 images.");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        });
      })
    ).then((base64Images) => {
      setImagePreviews((prev) => [...prev, ...newPreviews]);
      setImages((prev) => [...prev, ...base64Images]);
    });
  };

  const removeImage = (index) => {
    const newPreviews = [...imagePreviews];
    const newImages = [...images];
    newPreviews.splice(index, 1);
    newImages.splice(index, 1);
    setImagePreviews(newPreviews);
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !productName ||
      !productDescription ||
      !dressCondition ||
      !category ||
      !price ||
      images.length === 0
    ) {
      setError("Please fill out all fields and upload at least one image.");
      return;
    }

    setError("");

    const formData = {
      name: productName,
      description: productDescription,
      condition: dressCondition,
      category,
      negotiable,
      price,
      productImages: images,
    };

    const resp = addProduct(formData);
    // Reset

    if (resp) {
      setProductName("");
      setProductDescription("");
      setDressCondition("");
      setCategory("");
      setNegotiable(false);
      setPrice("");
      setImages([]);
      setImagePreviews([]);
    }
  };
  if (loading) {
    return (
      <div className="flex h-50 items-center justify-center bg-transparent z-50 pointer-events-none">
        <div className="bg-white  bg-opacity-90 rounded-xl shadow-lg p-8 flex flex-col items-center gap-4 max-w-xs w-full mx-4">
          <div className="w-16 h-16 border-4 border-green-400 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-green-700 font-semibold text-lg select-none">
            Adding Your Product...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-darkbrown">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="flex flex-col">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="bg-white p-2 rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="productDescription">Description</label>
          <textarea
            id="productDescription"
            rows={4}
            value={productDescription}
            placeholder="Enter product description"
            onChange={(e) => setProductDescription(e.target.value)}
            className="bg-white p-2 rounded-lg"
            required
          />
        </div>

        {/* Condition */}
        <div className="flex flex-col">
          <label htmlFor="dressCondition">Condition</label>
          <select
            id="dressCondition"
            value={dressCondition}
            onChange={(e) => setDressCondition(e.target.value)}
            className="bg-white p-2 rounded-lg"
            required
          >
            <option value="">Select condition</option>
            <option value="New">New</option>
            <option value="LikeNew">Like New</option>
            <option value="Used">Used</option>
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white p-2 rounded-lg"
            required
          >
            <option value="">Select category</option>
            <option value="Tops">Tops</option>
            <option value="Bottoms">Bottoms</option>
            <option value="Shoes">Shoes</option>
            <option value="Dress">Dress</option>
            <option value="Accessories">Accessories</option>
            <option value="Bags">Bags</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Negotiable */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="negotiable"
            checked={negotiable}
            onChange={() => setNegotiable(!negotiable)}
          />
          <label htmlFor="negotiable">Negotiable</label>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            placeholder="Your Product's Price"
            min={0}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-white p-2 rounded-lg"
            required
          />
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative group">
                <img
                  src={src}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs font-bold"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="imageUpload">Upload Product Images</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="bg-white p-2 rounded-lg"
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="mt-5 bg-brown text-cream p-3 px-8 rounded-lg hover:bg-darkbrown self-center cursor-pointer"
        >
          Display Product
        </button>
      </form>
    </div>
  );
};

export default SellerForm;
