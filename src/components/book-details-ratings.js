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

// TODO: Add tooltip explaining ranking
// 1 star - You should probably know the author or have written it yourself
// 2 star - This better be right in your genre wheelhouse
// 3 star - If this piques your interest, you'll probably like it
// 4 star - Most will enjoy this unless it is genre they hate
// 5 star - Amazing, recomended to everyone even if it is a genre you rarely read

function Ratings(props) {
  let readerRatings = [];
  // ex arr: [["Tyler", 4], ["Jessica", 2]]
  const ratingsKeyValueArr = Object.entries(props.json.ratings);
  ratingsKeyValueArr.forEach((reader) => {
    let stars = [];
    for (let i = 1; i < 6; i++) {
      if (i <= reader[1]) {
        stars.push(
          <span key={i} css={starsLit}>
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} css={starsDim}>
            ★
          </span>
        );
      }
    }
    readerRatings.push(
      <div key={reader[0]} css={ratingStyle}>
        <b>{reader[0]}</b>: {stars}
      </div>
    );
  });

  return <React.Fragment>{readerRatings}</React.Fragment>;
}

export default Ratings;
