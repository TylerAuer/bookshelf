/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const linkStyle = css`
  background: white;
  border-radius: 6px;
  color: black;
  /* color: #c45ec4; */
  font-weight: 600;
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
  let extLinkArr = [];
  for (let [key, value] of Object.entries(props.json.extLinks)) {
    extLinkArr.push(
      <li key={key} style={{ display: "inline" }}>
        <a href={value} css={linkStyle}>
          {key}
        </a>
      </li>
    );
  }

  return (
    <ul id="external-links" style={{ padding: "0px" }}>
      {extLinkArr}
    </ul>
  );
}

export default ShopLinkList;
