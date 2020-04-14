/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const linkStyle = css`
  background: white;
  border-radius: 6px;
  color: #c45ec4;
  font-weight: 700;
  font-size: 14px;
  padding: 4px 6px;
  margin: 3px 6px 3px 0px;
  border: 1px solid #c45ec4;
  transition-duration: 150ms;
  &:hover {
    color: white;
    background: #c45ec4;
    text-decoration: none;
  }
`;

function ShopLinkList(props) {
  return (
    <div id="links">
      <a href={props.json.amazonUrl} css={linkStyle}>
        Amazon
      </a>
      <a href={props.json.goodreadsUrl} css={linkStyle}>
        Goodreads
      </a>
    </div>
  );
}

export default ShopLinkList;
