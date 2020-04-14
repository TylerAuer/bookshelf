/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const titleStyle = css`
  font-size: 40px;
  font-weight: bold;
  line-height: 1;
  margin: 5px 0px;
`;

const subtitleStyle = css`
  font-size: 20px;
`;

const authorStyle = css`
  font-size: 20px;
  font-weight: bold;
  margin: 0px 0px;
  color: #c45ec4;
`;

function TitleInfo(props) {
  return (
    <div>
      <div css={titleStyle}>{props.json.title}</div>
      <div css={authorStyle}>{props.json.author}</div>
      <div css={subtitleStyle}>{props.json.subtitle}</div>
    </div>
  );
}

export default TitleInfo;
