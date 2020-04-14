/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import Tag from "./tag";

function TagList(props) {
  let tagArr = [];
  props.json.tags.forEach((tag, index) => {
    tagArr.push(<Tag key={index} title={tag} />);
  });
  return <React.Fragment>{tagArr}</React.Fragment>;
}

export default TagList;
