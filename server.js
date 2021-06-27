const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const uploadBuffer = require("./uploadBuffer");

const upload = multer({ desc: "uploads/" });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/api/postuploads", upload.single("photo"), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const postId = `blogimages/posts/test`;
    const result = await uploadBuffer(buffer, postId);
    const secureUrl = result.eager[0].secure_url;
    res.status(201).send({ url: secureUrl });
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
