import React from "react";
import Masonry from "react-masonry-css";
import "./cover-grid.css";
import BookCoverImg from "./book-cover";

// TODO: set up infinite scroll
function CoverGrid(props) {
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

  let coverArr = [];

  // if filters are being applied
  if (props.active.length > 0) {
    props.json.forEach((book, index) => {
      let intersection = book.tags.filter((x) => props.active.includes(x));
      if (intersection.length > 0) {
        coverArr.push(
          <div key={index}>
            <BookCoverImg json={book} onClick={props.onClick} />
          </div>
        );
      }
    });
    // default to showing all if no filters are active
  } else {
    props.json.forEach((book, index) => {
      coverArr.push(
        <div key={index}>
          <BookCoverImg json={book} onClick={props.onClick} />
        </div>
      );
    });
  }

  return (
    // add max-width (2400px) and auto side margins with media query
    <div style={{ position: "relative" }}>
      <div style={{ margin: "10px 5px" }}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {coverArr}
        </Masonry>
      </div>
    </div>
  );
}

export default CoverGrid;
