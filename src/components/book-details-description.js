/** @jsx jsx */
import React from "react";
import ReactHtmlParser from "react-html-parser";
import { jsx, css } from "@emotion/core";

const descStyle = css`
  font-size: 16px;
  margin: 5px 0px;
`;

function Description(props) {
  return <div css={descStyle}>{ReactHtmlParser(props.json.desc)}</div>;
}

export default Description;
