const cloudinary = require("cloudinary").v2;
require("dotenv/config");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const uploadProfilePicture = async (file, publicId) => {
  const result = await cloudinary.uploader.upload(file, {
    public_id: publicId,
    gravity: "face",
    width: 200,
    height: 200,
    effect: "grayscale",
    radius: "max",
    crop: "fill",
  });
  return result;
};

const uploadBuffer = async (file, publicId) => {
  const upload = await cloudinary.uploader.upload(file, {
    public_id: publicId,
    width: 854,
    format: "jpg",
  });
  return upload;
};

const uploadCoverImages = async (file) => {
  const result = cloudinary.uploader.upload(file, {
    responsive_breakpoints: {
      create_derived: true,
      min_width: 340,
      max_width: 1200,
      transformation: { format: "jpg" },
      max_images: 3,
    },
  });
  return result;
};

const deleteImages = async (publicIds) => {
  await cloudinary.api.delete_resources([publicIds]);
};

module.exports = {
  uploadBuffer,
  deleteImages,
  uploadCoverImages,
  uploadProfilePicture,
};
