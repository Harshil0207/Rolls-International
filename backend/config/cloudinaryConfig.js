import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Function to upload and transform images
export const uploadAndTransformImage = async (imageUrl, publicId) => {
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      public_id: publicId,
    });
    console.log('Upload Result:', uploadResult);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(publicId, {
      fetch_format: 'auto',
      quality: 'auto',
    });
    console.log('Optimized URL:', optimizeUrl);

    // Transform the image: auto-crop to square aspect ratio
    const autoCropUrl = cloudinary.url(publicId, {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    });
    console.log('Auto-Cropped URL:', autoCropUrl);

    return { uploadResult, optimizeUrl, autoCropUrl };
  } catch (error) {
    console.error('Error uploading or transforming image:', error);
    throw error;
  }
};

export default cloudinary;
