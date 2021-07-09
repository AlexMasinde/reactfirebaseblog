import { uploadImages } from "./axiosRequests";

export default async function uploadProfilePhoto(image, endpoint) {
  const results = await uploadImages(image, endpoint);
  const { url, publicId } = results.data;
  return { url, publicId, photo: true };
}
