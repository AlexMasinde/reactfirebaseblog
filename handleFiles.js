const cloudinary = require("cloudinary").v2;
require("dotenv/config");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const uploadBuffer = async (file, publicId) => {
  const eagerOptions = {
    width: 800,
    format: "jpg",
  };
  const upload = await cloudinary.uploader.upload(file, {
    public_id: publicId,
    eager: eagerOptions,
  });
  return upload;
};

const deleteImages = async (files) => {
  await cloudinary.api.delete_resources(files);
};

module.exports = { uploadBuffer, deleteImages };
