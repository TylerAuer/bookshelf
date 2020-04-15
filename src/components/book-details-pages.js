/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const pagesStyle = css``;

let Pages = (props) => {
  if (props.json.pages) {
    return (
      <div css={pagesStyle}>
        <b>Length:</b> {props.json.pages} pages
      </div>
    );
  } else {
    return null;
  }
};

export default Pages;
