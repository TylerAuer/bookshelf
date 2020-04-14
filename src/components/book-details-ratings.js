/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const ratingStyle = css`
  font-size: 16px;
`;

const starsLit = css`
  color: #c45ec4;
`;
const starsDim = css`
  color: darkgrey;
`;

function Ratings(props) {
  let readerRatings = [];
  props.json.readers.forEach((reader) => {
    let stars = [];
    for (let i = 1; i < 6; i++) {
      if (i <= reader.rating) {
        stars.push(<span css={starsLit}>★</span>);
      } else {
        stars.push(<span css={starsDim}>★</span>);
      }
    }
    readerRatings.push(
      <div css={ratingStyle}>
        <b>{reader.name}</b>: {stars}
      </div>
    );
  });

  return <React.Fragment>{readerRatings}</React.Fragment>;
}

export default Ratings;
