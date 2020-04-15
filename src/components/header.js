/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { theme } from "../css-variables";

const headerDivStyle = css`
  background: ${theme.mainColorDark};
  padding: 40px 20px 0px 20px;
  margin-bottom: 10px;
  color: white;
`;

const titleStyle = css`
  font-size: 60px;
  font-weight: bolder;
  line-height: 1;
`;
const subtitleStyle = css`
  font-size: 18px;
  line-height: 1;
`;

const navDivStyle = css`
  position: relative;
  bottom: 4px;
`;

const linkStyle = css`
  display: inline;
  color: ${theme.mainColorLight};
  font-weight: bold;
  background: white;
  border-radius: 5px 5px 0px 0px;
  font-size: 22px;
  padding: 6px 12px;
  margin: 5px 10px 0px 0px;
`;

//TODO: fix style of "pill" links at the bottom so they look like cutouts

function SiteHeader(props) {
  return (
    <div className="container-fluid" css={headerDivStyle}>
      <div className="m-3">
        <h1 css={titleStyle}>The Purple Herd</h1>
      </div>
      <div className="m-3 mb-5">
        <span css={subtitleStyle}>
          Udderly fantastic ramblings, reviews, and reflections from a herd of
          purple cows.
        </span>
      </div>
      <div id="nav-links" css={navDivStyle}>
        <div css={linkStyle}>Covers</div>
        <div css={linkStyle}>List</div>
        <div css={linkStyle}>Podcast</div>
      </div>
    </div>
  );
}

export default SiteHeader;
