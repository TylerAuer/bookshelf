/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { theme } from "../css-variables";

const headerContentDivStyle = css`
  background-image: linear-gradient(
    90deg,
    ${theme.mainColorDark} 0%,
    ${theme.mainColorLight} 75%
  );
  max-width: 2450px;
  position: relative;
  overflow: hidden;
  padding-bottom: 60px; /* for the nav buttons */
  @media (min-width: 2450px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

// TODO: Play with max-width and media queries for looks
const titleDiv = css`
  color: white;
  padding: 30px 5px 5px 15px;
`;

const titleStyle = css`
  font-size: 45px;
  font-weight: bolder;
  text-align: center;
  line-height: 1.1;
  @media (min-width: 576px) {
    font-size: 60px;
    text-align: left;
  }
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
  border: none; /* resets border */
  border-top: 3px solid ${theme.mainColorLight};
  padding: 3px 9px;
  margin: 5px 10px 0px 0px;
  background-size: 100% 200%;
  background-image: linear-gradient(
    to bottom,
    white 50%,
    ${theme.mainColorLight} 50%
  );
  -webkit-transition: background-position 0.5s;
  -moz-transition: background-position 0.5s;
  transition: background-position 0.5s, color 0.125s 0.125s, border-top 1s;
  &:hover {
    color: white;
    background-position: 0 -100%;
    border-top: 3px solid ${theme.mainColorDark};
  }
  &:focus {
    outline: none;
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
