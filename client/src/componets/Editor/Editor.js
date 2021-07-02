import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./editor.css";

import { database } from "../../firebase";

import Preview from "../Preview/Preview";

import deleteImages from "../../utils/deleteImages";
import uploadImages from "../../utils/uploadImages";
import searchArticle from "../../utils/searchArticle";
import validate from "../../utils/validate";

export default function Editor() {
  //Access local storage to retrieve saved data
  function getSavedArticle() {
    if (localStorage && localStorage.getItem("articleDraft")) {
      const savedArticle = JSON.parse(localStorage.getItem("articleDraft"));
      return savedArticle;
    }
    return { title: "", category: "", content: "" };
  }

  function getSavedImageUrls() {
    if (localStorage && localStorage.getItem("savedImageUrls")) {
      const savedImageUrls = JSON.parse(localStorage.getItem("savedImageUrls"));
      return savedImageUrls;
    }
    return [];
  }

  const article = getSavedArticle();
  const imageUrls = getSavedImageUrls();

  //initialize state
  const [articleContent, setArticleContent] = useState({
    title: article.title,
    tagline: article.tagline,
    category: article.category,
    content: article.content,
  });

  const [status, setStatus] = useState({
    editing: false,
    previewing: true,
  });

  const [imageUrl, setImageUrl] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState(imageUrls);

  const [errors, setErrors] = useState([]);

  //get curent user as author from auth context
  const author = {
    firstName: "Alex",
    lastName: "Masinde",
  };

  //List of topics to write on
  const categories = [
    "Technology",
    "Health",
    "Family",
    "Politics",
    "Culture",
    "Music",
    "Movies",
    "Environment",
    "Business",
    "Marketing",
    "Jobs",
    "Econony",
  ];

  //toggle between Edit and Preview
  function setPreview() {
    setStatus({ editing: false, previewing: true });
  }

  function setEdit() {
    setStatus({ editing: true, previewing: false });
  }

  //change state
  function handleArticleTitle(e) {
    setArticleContent({ ...articleContent, title: e.target.value });
    if (errors) {
      errors.title = "";
    }
  }

  function handleArticleCategory(e) {
    setArticleContent({ ...articleContent, category: e.target.value });
    if (errors) {
      errors.category = "";
    }
  }

  function handleArticleText(e) {
    setArticleContent({ ...articleContent, content: e.target.value });
    if (errors) {
      errors.content = "";
    }
  }

  function handleArticleTagline(e) {
    setArticleContent({ ...articleContent, tagline: e.target.value });
    if (errors) {
      errors.tagline = "";
    }
  }

  async function handleCoverImage(e) {
    const image = e.target.files[0];
    const url = "http:://localhost:5000/api/coveruploads";
    try {
      const result = await uploadImages(image, url);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleArticleFile(e) {
    const image = e.target.files[0];
    const url = "http://localhost:5000/api/postuploads";
    try {
      const result = await uploadImages(image, url);
      const secureUrl = result.data.url;
      const publicId = result.data.publicId;
      setUploadedFiles([
        ...uploadedFiles,
        { url: secureUrl, used: true, publicId },
      ]);
      setImageUrl(`![Alt Text](${secureUrl})`);
      console.log(uploadedFiles);
    } catch (err) {
      console.log(err);
    }
  }

  //publish article
  async function publishArticle() {
    const { title, category, content } = articleContent;
    const { validationErrors, valid } = validate(title, category, content);
    if (!valid) {
      console.log(validationErrors);
      return setErrors(validationErrors);
    }

    try {
      const articleId = uuid();
      await database.articles
        .doc(articleId)
        .set({ articleId, title, category, content });

      //search article to find used images
      const updatedUrls = await searchArticle(uploadedFiles, content);

      //proceed to delete unused images
      const unusedImages = updatedUrls.filter((updatedUrl) => !updatedUrl.used);
      if (unusedImages.length > 0) {
        const publicIds = unusedImages.map((unusedImage) => {
          return unusedImage.publicId;
        });
        await deleteImages(publicIds);
      }

      //delete content from local storage
      if (localStorage && localStorage.getItem("articleDraft")) {
        localStorage.removeItem("articleDraft");
      }
      if (localStorage && localStorage.getItem("savedImageUrls")) {
        localStorage.removeItem("savedImageUrls");
      }
    } catch (err) {
      console.log(err);
      setErrors({
        message: "Could not publish article! Please try again",
      });
    }
  }

  //save article draft to local storage
  function saveArticle() {
    if (uploadedFiles.length > 0) {
      const savedImageUrls = JSON.stringify(uploadedFiles);
      localStorage.setItem("savedImageUrls", savedImageUrls);
    }

    if (
      articleContent.title.trim("") !== "" ||
      articleContent.category.trim("") !== "" ||
      articleContent.content.trim("") !== ""
    ) {
      const articleDraft = JSON.stringify(articleContent);
      localStorage.setItem("articleDraft", articleDraft);
    } else {
      alert("Cannot save empty");
    }
  }

  //discard current changes and reset local storage
  async function discardArticle() {
    if (localStorage && localStorage.getItem("articleDraft")) {
      localStorage.removeItem("articleDraft");
    }

    if (localStorage && localStorage.getItem("savedImageUrls")) {
      const savedImageUrls = JSON.parse(localStorage.getItem("savedImageUrls"));
      console.log(savedImageUrls);
      const publicIds = savedImageUrls.map((savedImageUrl) => {
        return savedImageUrl.publicId;
      });
      try {
        await deleteImages(publicIds);
      } catch {
        setErrors([
          {
            message:
              "Could not discard! Please check your connection and try again ",
          },
        ]);
      }
      localStorage.removeItem("savedImageUrls");
    }

    setArticleContent({
      title: "",
      category: "",
      content: "",
    });
    setUploadedFiles([]);
  }

  return (
    <div>
      <div className="navigation">
        <div className="navigation__title">
          <p>Wave Blog</p>
        </div>
        <div className="navigation__buttons">
          <p className={status.editing ? "selected" : ""} onClick={setEdit}>
            Edit
          </p>
          <p
            className={status.previewing ? "selected" : ""}
            style={{ marginLeft: "10px" }}
            onClick={setPreview}
          >
            Preview
          </p>
        </div>
        <div className="navigation__back">
          <p>Back</p>
        </div>
      </div>

      {status.previewing && (
        <Preview articleContent={articleContent} author={author} />
      )}
      {status.editing && (
        <div className="container">
          <div className="editor">
            <div className="editor__upload">
              <label htmlFor="file-upload" className="editor__upload--button">
                <input
                  onChange={(e) => handleArticleFile(e)}
                  name="file"
                  id="file-upload"
                  type="file"
                />
                Select File
              </label>
              <p>{imageUrl}</p>
            </div>
            <div className="editor__title">
              <input
                type="text"
                placeholder="Title.."
                value={articleContent.title}
                onChange={(e) => handleArticleTitle(e)}
              />
            </div>
            <div className="editor__tagline">
              <input
                type="text"
                placeholder="Title.."
                value={articleContent.tagline}
                onChange={(e) => handleArticleTagline(e)}
              />
            </div>
            <div className="editor__categories">
              <select
                value={articleContent.category}
                className="editor__categories--select"
                onChange={(e) => handleArticleCategory(e)}
              >
                {categories?.map((category, index) => {
                  return (
                    <option key={index} value={category.toLowerCase()}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="editor__text">
              <textarea
                placeholder="..."
                value={articleContent.content}
                rows="12"
                cols="50"
                onChange={(e) => handleArticleText(e)}
              ></textarea>
            </div>
            <div className="editor__control">
              <button
                onClick={publishArticle}
                className="editor__control--publish"
              >
                Publish
              </button>
              <button onClick={saveArticle} className="editor__control--save">
                Save
              </button>
              <button
                onClick={discardArticle}
                className="editor__control--discard"
              >
                Discard
              </button>
            </div>
            {errors && (
              <div>
                <p>{errors.title}</p>
                <p>{errors.category}</p>
                <p>{errors.content}</p>
              </div>
            )}
          </div>
          <div className="instructions">
            <div className="instructions__file">
              <h6>Image</h6>
              <p>
                Select an image then paste the generated link to the section of
                the article where you would like the image to be palced. Make
                sure to edit 'Alt Text' to describe your image in case it fails
                to load when your article is being read
              </p>
            </div>
            <div className="instructions__title">
              <h6>Title</h6>
              <p>
                Add the title of your article. The title can be upto 50
                characters long
              </p>
            </div>
            <div className="instructions__tips">
              <h6>Editing Tips</h6>
              <p>NB: Use Markdown</p>
              <div className="instructions__tips--container">
                <div className="instructions__tips--containerHeader">
                  <p>
                    # Header<span>H1 Header</span>
                  </p>
                  <p>
                    ## Header<span>H2 Header</span>
                  </p>
                </div>
                <p>
                  *italics*<span style={{ fontStyle: "italic" }}>Italics</span>
                </p>
                <p>
                  **bold**<span style={{ fontWeight: "700" }}>bold</span>
                </p>
                <p>
                  [Link](https://...)<span style={{ color: "blue" }}>Link</span>
                </p>
                <div className="instructions__tips--containerList">
                  <p>
                    * item 1<span>item 1</span>
                  </p>
                  <p>
                    * item 1<span>item 2</span>
                  </p>
                  <p>
                    1. item 1<span>item 1</span>
                  </p>
                  <p>
                    2. item 1<span>item 2</span>
                  </p>
                </div>
                <p>
                  &lt; quoted text
                  <span
                    style={{
                      borderLeft: "4px solid #9fa5ad",
                      paddingLeft: "4px",
                    }}
                  >
                    quoted text
                  </span>
                </p>
                <p>
                  `inline code`
                  <code>
                    <span>inline code</span>
                  </code>
                </p>
                <div className="instructions__tips--containerCode">
                  <div>
                    <p>```</p>
                    <p style={{ paddingTop: 0 }}>code block</p>
                    <p>```</p>
                  </div>
                  <div>
                    <code
                      style={{
                        backgroundColor: "#9fa5ad",
                        padding: "6px",
                        borderRadius: "4px",
                      }}
                    >
                      code block
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
