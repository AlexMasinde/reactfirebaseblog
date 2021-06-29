import React, { useState } from "react";
import "./editor.css";

function App() {
  const [category, setCategory] = useState("politics");
  const categories = ["Technology", "Health", "Technology"];

  function handleCategory(e) {
    setCategory(e.target.value);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="editor">
          <div className="editor_header">
            <p>Edit</p>
            <p>Preview</p>
          </div>
          <div className="editor_upload">
            <label for="file-upload" className="editor_upload_button">
              <input id="file-upload" type="file" />
              Select File
            </label>
            <p>No file selected...</p>
          </div>
          <div className="editor_title">
            <input type="text" placeholder="Title.." />
          </div>
          <div className="editor_categories">
            <select
              className="editor_categories_select"
              onChange={handleCategory}
            >
              {categories?.map((category) => {
                return (
                  <option value={category.toLowerCase()}>{category}</option>
                );
              })}
            </select>
          </div>
          <div className="editor_text">
            <textarea
              placeholder="Your article goes here..."
              rows="4"
              cols="50"
            ></textarea>
          </div>
        </div>
        <div className="instructions">
          <div className="instructions__file">
            <h6>Image</h6>
            <p>
              Select an image then paste the generated link to the section of
              the article where you would like the image to be palced. Make sure
              to edit 'Alt Text' to describe your image in case it fails to load
              when your article is being read
            </p>
          </div>
          <div className="Instructions__title">
            <h6>Title</h6>
            <p>
              Add the title of your article. The title can be upto 50 characters
              long
            </p>
          </div>
          <div className="instructions__tips">
            <h6>Editing Tips</h6>
            <h7>NB: Use Markdown</h7>
            <div className="instructions__tips--container">
              <div className="instructions__tips--containerHeader">
                <p>
                  # Header<span>H1 Header</span>
                </p>
                <p>
                  Increase the number of '#' to reduce intensity. E.g. '##
                  Header' = H2 Header
                </p>
              </div>
              <p>
                *italics*<span>Italics</span>
              </p>
              <p>
                **bold**<span>bold</span>
              </p>
              <p>
                [Link](https://...)<span>Link</span>
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
                &lt; quoted text<span>quoted text</span>
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
    </div>
  );
}

export default App;
