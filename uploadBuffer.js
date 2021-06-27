const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv/config");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const uploadBuffer = (buffer, publicId) => {
  const eagerOptions = {
    width: 800,
    format: "jpg",
  };
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { public_id: publicId, eager: eagerOptions },
      function (error, result) {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(upload);
  });
};

module.exports = uploadBuffer;
