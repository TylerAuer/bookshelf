/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const tagStyle = css`
  background: #c45ec4;
  border-radius: 6px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  padding: 4px 6px;
  margin: 3px 6px 3px 0px;
  border: 1px solid #c45ec4;
  transition-duration: 150ms;
  float: left;
  &:hover {
    color: #c45ec4;
    background: white;
    text-decoration: none;
  }
`;

function Tag(props) {
  return (
    <a href="#" css={tagStyle}>
      {props.title}
    </a>
  );
}

export default Tag;
