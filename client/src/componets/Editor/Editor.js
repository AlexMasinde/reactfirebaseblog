import React, { useState } from "react";
import "./editor.css";

import Preview from "../Preview/Preview";

export default function Editor() {
  const [articleContent, setArticleContent] = useState({
    title: "",
    category: "Select",
    content: "",
  });

  const author = {
    firstName: "Alex",
    lastName: "Masinde",
  };

  const [status, setStatus] = useState({
    editing: false,
    previewing: true,
  });

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

  function setPreview() {
    setStatus({ editing: false, previewing: true });
    console.log(articleContent);
  }

  function setEdit() {
    setStatus({ editing: true, previewing: false });
    console.log(articleContent);
  }

  function handleArticleTitle(e) {
    setArticleContent({ ...articleContent, title: e.target.value });
    console.log(articleContent);
  }

  function handleArticleCategory(e) {
    setArticleContent({ ...articleContent, category: e.target.value });
    console.log(articleContent);
  }

  function handleArticleText(e) {
    setArticleContent({ ...articleContent, content: e.target.value });
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
                <input id="file-upload" type="file" />
                Select File
              </label>
              <p>No file selected...</p>
            </div>
            <div className="editor__title">
              <input
                type="text"
                placeholder="Title.."
                value={articleContent.title}
                onChange={(e) => handleArticleTitle(e)}
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
              <button className="editor__control--publish">Publish</button>
              <button className="editor__control--save">Save</button>
              <button className="editor__control--discard">Discard</button>
            </div>
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
