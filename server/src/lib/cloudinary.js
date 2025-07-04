import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Function to upload an image to Cloudinary

export async function uploadImage(image) {
  try {
    if (image.startsWith("data:image")) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "product_images",
      });
      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } else {
      throw new Error("Invalid image format. Please provide a valid image.");
    }
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
}

export async function deleteImages(publicIds) {
  try {
    const results = await Promise.all(
      publicIds.map((id) => cloudinary.uploader.destroy(id))
    );

    const allSuccessful = results.every((r) => r.result === "ok");

    if (!allSuccessful) {
      throw new Error("One or more image deletions failed");
    }

    return true;
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
    throw new Error("Image deletion failed");
  }
}
