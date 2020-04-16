/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import Tag from "./tag";

function TagList(props) {
  let tagArr = [];
  props.json.tags.forEach((tag, index) => {
    tagArr.push(
      <li key={index} style={{ display: "inline", float: "left" }}>
        <Tag title={tag} />
      </li>
    );
  });
  return <ul style={{ padding: "0px" }}>{tagArr}</ul>;
}

export default TagList;
