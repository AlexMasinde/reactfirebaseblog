import axios from "axios";

export default async function deleteImages(publicIds) {
  const payload = {
    publicIds,
  };
  await axios.delete("http://localhost:5000/api/deleteimages", {
    data: payload,
  });
}
