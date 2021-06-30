import React from "react";
import "./preview.css";

export default function Preview() {
  return (
    <div className="preview__container">
      <div className="preview__header">
        <h1>
          The advent of a new era in the life of Alex Masinde. Greatness awaits
          people
        </h1>
        <p>
          A small excerpt of the text, a few characters long to help get a gist
          of what is coming in. Hot stuff
        </p>
        <div className="preview__author">
          <p>By Author</p>
          <p>Date</p>
        </div>
      </div>
      <div className="preview__coverImage">
        <p>Cover image goes here</p>
      </div>
      <div className="preview__text">
        <p>Your text goes here</p>
      </div>
    </div>
  );
}
