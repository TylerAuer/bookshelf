/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import SeriesInfo from "./book-details-series-info";

const titleStyle = css`
  font-size: 35px;
  font-weight: bold;
  margin: 0px;
  line-height: 1;
`;

const subtitleStyle = css`
  color: #c45ec4;
  font-size: 25px;
`;

function TitleInfo(props) {
  return (
    <div id="title-info">
      <div css={titleStyle}>{props.json.title}</div>
      <div css={subtitleStyle}>{props.json.subtitle}</div>
      <SeriesInfo json={props.json} />
    </div>
  );
}

export default TitleInfo;
