import React from "react";
import Masonry from "react-masonry-css";
import cover from "../covers/chiang-exhalation.jpg";
import "./cover-grid.css";

// TODO: move styles to here with @emotio
// TODO: test with different size cover images
// TODO: extract cover image to separate component
// TODO: set columns based on device size
// TODO: make margins thinner
// TODO: set up infinite scroll

const breakpointColumnsObj = {
  default: 5,
  1100: 4,
  700: 3,
  500: 2,
};

let testArr = [];
for (let i = 0; i < 50; i++) {
  testArr.push(
    <div>
      <img style={{ width: "100%", height: "auto" }} key={i} src={cover} />
    </div>
  );
}

function CoverGrid(props) {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {testArr}
    </Masonry>
  );
}

export default CoverGrid;
