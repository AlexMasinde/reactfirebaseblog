import axios from "axios";

export default async function uploadImages(image, url) {
  let formData = new FormData();
  formData.append("file", image);
  const result = await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
}
