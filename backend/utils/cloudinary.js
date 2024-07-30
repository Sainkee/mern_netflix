// config/cloudinary.js
import { v2 as cloudinaryUpload } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinaryUpload.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECREAT_KEY,
});

export default cloudinaryUpload;
