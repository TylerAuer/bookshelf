/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { theme } from "../css-variables";

const headerContentDivStyle = css`
  background: ${theme.mainColorDark};
  max-width: 2450px;
  position: relative;
  overflow: hidden;
  padding-bottom: 60px; /* for the nav buttons */
  @media (min-width: 2450px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const titleDiv = css`
  color: white;
  padding: 30px 5px 5px 15px;
`;

const titleStyle = css`
  font-size: 40px;
  font-weight: bolder;
  line-height: 1;
`;

const subtitleStyle = css`
  line-height: 1;
`;

const navDivStyle = css`
  position: absolute;
  bottom: 0;
  padding-left: 10px;
`;

const linkStyle = css`
  color: ${theme.mainColorLight};
  font-weight: bold;
  text-align: center;
  background: white;
  border-radius: 6px 6px 0px 0px;
  border: none;
  padding: 3px 9px;
  margin: 5px 10px 0px 0px;
  transition-duration: 150ms;
  &:hover {
    background-color: ${theme.mainColorLight};
    color: white;
  }
`;

//TODO: fix style of "pill" links at the bottom so they look like cutouts

function SiteHeader(props) {
  return (
    <div id="header-content" css={headerContentDivStyle}>
      <div css={titleDiv}>
        <h1 css={titleStyle}>The Purple Herd</h1>
        <span css={subtitleStyle}>
          Udderly fantastic ramblings, reviews, and reflections from a herd of
          purple cows.
        </span>
      </div>
      <div css={navDivStyle}>
        <div className="d-flex flex-row">
          <button css={linkStyle}>Covers</button>
          <button css={linkStyle}>List</button>
          <button css={linkStyle}>Podcast</button>
          <button css={linkStyle}>About</button>
        </div>
      </div>
    </div>
  );
}

export default SiteHeader;
