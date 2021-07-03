import axios from "axios";

export async function uploadImages(image, url) {
  let formData = new FormData();
  formData.append("file", image);
  const result = await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
}

export async function deleteImages(publicIds) {
  const payload = {
    publicIds,
  };
  await axios.delete("http://localhost:5000/api/deleteimages", {
    data: payload,
  });
}
