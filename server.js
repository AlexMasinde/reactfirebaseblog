const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const uploadBuffer = require("./uploadBuffer");
const cors = require("cors");
const multipart = require("connect-multiparty");

const upload = multer({ desc: "uploads/" });

const app = express();

app.use(multipart());
app.use(express.json());
//enabled for development
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/api/postuploads", async (req, res) => {
  try {
    const file = req.files.upload;
    const postId = `blogimages/posts/test`;
    const result = await uploadBuffer(file.path, postId);
    const secureUrl = result.eager[0].secure_url;
    console.log(secureUrl);
    res.status(201).send({ uploaded: true, url: secureUrl });
  } catch (err) {
    console.log(err);
    res.status(500).send({ uploaded: false, url: "invalid image file" });
  }
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
