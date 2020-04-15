import React from "react";
import Masonry from "react-masonry-css";
import cover from "../covers/chiang-exhalation.jpg";
import "./cover-grid.css";
import BookCoverImg from "./book-cover";

// TODO: test with different size cover images
// TODO: set up infinite scroll

function CoverGrid(props) {
  // BUG: Make sure these values garuntee the width is <= 250px;
  const breakpointColumnsObj = {
    default: 9,
    2200: 8,
    1900: 7,
    1650: 6,
    1350: 5,
    1100: 4,
    700: 3,
    500: 2,
  };

  // can add filter to this later
  // array of acceptable settings in a state
  // cross-references with json
  // sort order will be another challenge
  let coverArr = [];
  props.json.forEach((book, index) => {
    coverArr.push(
      <div>
        <BookCoverImg json={book} />
      </div>
    );
  });

  return (
    // add max-width (2400px) and auto side margins with media query
    <div style={{ margin: "10px 5px" }}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {coverArr}
      </Masonry>
    </div>
  );
}

export default CoverGrid;
