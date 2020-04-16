/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { theme } from "../css-variables";

const tagDivStyle = css`
  margin: 5px auto;
  max-width: 2400px;
`;

const tagBtnStyle = css`
  background-image: linear-gradient(
    90deg,
    ${theme.mainColorDark},
    ${theme.mainColorLight}
  );
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 4px 8px;
  margin: 1px;
  width: 190px;
  @media (min-width: 768px) {
    background-image: linear-gradient(
      ${theme.mainColorDark},
      ${theme.mainColorLight}
    );
    width: 100%;
  }
`;

function TagListFull(props) {
  let tagArr = [];
  props.json.forEach((book, index) => {
    for (let tag of book.tags) {
      if (!tagArr.includes(tag)) {
        tagArr.push(tag);
      }
    }
  });

  tagArr.sort();
  const tagElementList = tagArr.map((tag, index) => {
    return (
      <button
        className="inactive-tag flex-fill"
        key={index}
        id={tag}
        css={tagBtnStyle}
      >
        {tag}
      </button>
    );
  });

  return (
    <div className="container-fluid p-3 d-flex flex-wrap" css={tagDivStyle}>
      {tagElementList}
    </div>
  );
}

export default TagListFull;
