/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { theme } from "../css-variables";

const tagDivStyle = css``;

//BUG: Outline doesn't appear on most recently clicked button
const tagBtnStyle = css`
  color: ${theme.mainColorLight};
  border: none;
  font-size: 15px;
  font-family: "IBM Plex Mono", monospace;
  text-transform: lowercase;
  margin: 2px 7px;
  &:hover {
    color: ${theme.mainColorDark};
    text-transform: uppercase;
    font-weight: bold;
  }
`;

const tagBtnActiveStyle = css`
  color: black;
  font-weight: bold;
  text-transform: uppercase;
`;

function TagListFull(props) {
  // Collects list of all tags used in book-data.json
  let tagArr = [];
  props.json.forEach((book, index) => {
    for (let tag of book.tags) {
      if (!tagArr.includes(tag)) {
        tagArr.push(tag);
      }
    }
  });
  tagArr.sort();

  // Converts each tag into JSX
  let tagElementList = tagArr.map((tag, index) => {
    let btnStyles = [tagBtnStyle];
    if (props.active.includes(tag)) {
      btnStyles.push(tagBtnActiveStyle);
    }

    return (
      <button key={index} id={tag} css={btnStyles} onClick={props.onClick}>
        {tag}
      </button>
    );
  });

  // Adds All button
  tagElementList.unshift();

  return (
    <div className="container">
      <div
        className="p-2 d-flex flex-wrap justify-content-center"
        css={tagDivStyle}
      >
        {tagElementList}
      </div>
    </div>
  );
}

export default TagListFull;
