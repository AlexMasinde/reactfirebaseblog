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

const uploadCoverImages = async (file) => {
  const result = cloudinary.uploader.upload(file, {
    responsive_breakpoints: {
      create_derived: true,
      min_width: 340,
      max_width: 800,
      transformation: { format: "jpg" },
      max_images: 3,
    },
  });
  return result;
};

const deleteImages = async (files) => {
  await cloudinary.api.delete_resources([
    "blogimages/posts/d1b996e2-7752-42d2-967f-fdb37739963",
  ]);
};

module.exports = { uploadBuffer, deleteImages, uploadCoverImages };
