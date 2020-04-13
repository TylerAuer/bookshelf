/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import SeriesInfo from "./book-details-series-info";

const titleDivStyle = css`
  border-left: 4px solid #c45ec4;
  padding-left: 5px;
`;
const titleStyle = css`
  font-size: 40px;
  font-weight: bold;
  line-height: 1;
`;

const subtitleStyle = css`
  font-size: 20px;
`;

const authorStyle = css`
  font-size: 24px;
  font-weight: bold;
  margin: 5px 0px;
  color: #c45ec4;
`;

function TitleInfo(props) {
  return (
    <React.Fragment>
      <div css={titleDivStyle}>
        <div css={titleStyle}>{props.json.title}</div>
        <div css={subtitleStyle}>{props.json.subtitle}</div>
      </div>
      <div css={authorStyle}>{props.json.author}</div>
    </React.Fragment>
  );
}

export default TitleInfo;
