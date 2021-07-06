const express = require("express");
const { v4: uuid } = require("uuid");
const cors = require("cors");
const multipart = require("connect-multiparty");

const {
  uploadBuffer,
  deleteImages,
  uploadCoverImages,
} = require("./handleFiles");

const app = express();

app.use(multipart());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//enabled for development
app.use(cors());

app.post("/api/postuploads", async (req, res) => {
  try {
    const file = req.files.file;
    const postId = `blogimages/posts/${uuid()}`;
    const result = await uploadBuffer(file.path, postId);
    const secureUrl = result.eager[0].secure_url;
    const publicId = result.public_id;
    res.status(201).send({ url: secureUrl, publicId: publicId });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errorMessage: "Could not process your request. Please try again",
    });
  }
});

app.post("/api/coverupload", async (req, res) => {
  try {
    const file = req.files.file;
    const result = await uploadCoverImages(file.path);
    res.send(result.responsive_breakpoints[0]);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/deleteimages", async (req, res) => {
  const publicIds = req.body.publicIds;
  try {
    const result = await deleteImages(publicIds);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
