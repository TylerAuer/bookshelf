/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { theme } from "../css-variables";

const headerDivStyle = css`
  background: ${theme.mainColorDark};
  padding: 40px 20px;
  color: white;
`;

const titleStyle = css`
  font-size: 60px;
  font-weight: bolder;
  line-height: 1;
`;

const listItemStyle = css`
  float: left;
  display: inline;
  color: black;
  background: white;
  border-radius: 5px 5px 0px 0px;
  font-size: 20px;
  padding: 6px 12px;
  margin: 5px 10px 0px 0px;
`;

function SiteHeader(props) {
  return (
    <div className="container-fluid" css={headerDivStyle}>
      <h1 css={titleStyle}>Purple Cow Books</h1>
      <p>
        Literary ramblings, reviews, and reflections from a herd of purple cows.
      </p>
      <ul style={{ padding: "0px", marginBottom: "0px" }}>
        <li css={listItemStyle}>Podcast</li>
      </ul>
    </div>
  );
}

export default SiteHeader;
