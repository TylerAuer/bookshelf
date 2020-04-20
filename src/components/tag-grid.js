/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { theme } from "../css-variables";

const tagDivStyle = css`
  margin: 5px auto;
  max-width: 2400px;
`;

//BUG: Outline doesn't appear on most recently clicked button
const tagBtnStyle = css`
  background-image: linear-gradient(
    90deg,
    ${theme.mainColorDark},
    ${theme.mainColorLight}
  );
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  border: 2px solid ${theme.mainColorDark};
  color: white;
  font-weight: bold;
  font-size: 16px;
  padding: 4px 8px;
  margin: 2px;
  width: 190px;
  @media (min-width: 768px) {
    background-image: linear-gradient(
      ${theme.mainColorDark},
      ${theme.mainColorLight}
    );
    width: 100%;
  }
  &:hover {
    outline: 3px solid ${theme.mainColorDark};
  }
  &:focus {
    outline: none;
  }
`;

const tagBtnActiveStyle = css`
  background-color: transparent;
  color: ${theme.mainColorLight};
  border: 2px solid ${theme.mainColorDark};
  font-weight: bold;
  font-size: 16px;
  padding: 4px 8px;
  margin: 2px;
  width: 190px;
  box-shadow: 3px 2px 2px ${theme.mainColorDark};
  @media (min-width: 768px) {
    width: 100%;
  }
  &:focus {
    outline: none;
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
    if (props.active.includes(tag)) {
      return (
        <button
          className="flex-fill"
          key={index}
          id={tag}
          css={tagBtnActiveStyle}
          onClick={props.onClick}
        >
          {tag}
        </button>
      );
    }

    return (
      <button
        className="flex-fill"
        key={index}
        id={tag}
        css={tagBtnStyle}
        onClick={props.onClick}
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
