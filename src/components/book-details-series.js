/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const seriesStyle = css``;

let SeriesInfo = (props) => {
  if (props.json.seriesIndex) {
    return (
      <div css={seriesStyle}>
        <b>Series:</b> {props.json.seriesIndex} of {props.json.seriesLength} in{" "}
        {props.json.seriesTitle}
      </div>
    );
  } else {
    return null;
  }
};

export default SeriesInfo;
