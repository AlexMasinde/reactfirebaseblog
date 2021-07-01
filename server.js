const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const uploadBuffer = require("./uploadBuffer");
const cors = require("cors");
const bodyParser = require("body-parser");
const multipart = require("connect-multiparty");

const upload = multer({ desc: "uploads/" });

const app = express();

app.use(multipart());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//enabled for development
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/api/postuploads", async (req, res) => {
  try {
    const file = req.files.file;
    const postId = `blogimages/posts/test`;
    const result = await uploadBuffer(file.path, postId);
    const secureUrl = result.eager[0].secure_url;
    res.status(201).send({ url: secureUrl });
  } catch (err) {
    console.log(err);
    res.status(500).send({ uploaded: false, url: "invalid image file" });
  }
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
