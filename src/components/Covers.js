import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
//import { useTransition, a } from 'react-spring';
//import shuffle from '../functions/shuffleList';
import useResponsiveDimensions from '../hooks/useResponsiveDimensions';

function Covers({ activeBooks }) {
  const location = useLocation();
  // Detects dimensions of the masonry container
  const componentRef = useRef();
  const { width: gridWidth, height: gridHeight } = useResponsiveDimensions(
    componentRef
  );

  const columns = 5;
  const columnWidth = Math.floor(gridWidth / columns);
  const gutter = 30;
  const columnHeights = new Array(columns).fill(0);

  // Iterate over each cover
  const masonryGrid = activeBooks.map((book) => {
    // Find the column with the smallest cumulative height
    const indexOfShortestColumn = columnHeights.indexOf(
      Math.min(...columnHeights)
    );
    // Use the column index to determine the x coordinate
    const xOffset = columnWidth * indexOfShortestColumn;
    // Use the column's height to determine the y coordinate
    const yOffset = columnHeights[indexOfShortestColumn];
    // Calculate the image's height based on the column width
    const proportionalHeight =
      columnWidth * book.coverImgInfo.heightDividedByWidth;
    // Add the image's height to the column's previous height
    columnHeights[indexOfShortestColumn] += proportionalHeight;

    return (
      <div
        style={{
          left: `${xOffset}px`,
          top: `${yOffset}px`,
          position: 'absolute',
        }}
      >
        <img
          key={book.id}
          className="covers__single-cover"
          alt={book.title}
          src={require(`../covers/${book.coverImgFileName}`)}
          style={{
            width: columnWidth,
            height: proportionalHeight,
          }}
        />
      </div>
    );
  });

  return (
    <div
      ref={componentRef}
      id="covers__container"
      style={{ border: 'red 1px solid', position: 'relative' }}
    >
      {masonryGrid}
    </div>
  );
}
//   let coverArr = activeBooks.map((book) => {
//     return (
//       <Link
//         key={book.id}
//         to={{
//           pathname: `/single/${book.id}`,
//           search: location.search,
//         }}
//       >
//         <img
//           key={book.id}
//           className="covers__cover"
//           alt={book.title}
//           src={require(`../covers/${book.coverImgFileName}`)}
//         />
//       </Link>
//     );
//   });

//   return (
//     // add max-width (2400px) and auto side margins with media query
//     <div style={{ position: 'relative' }}>
//       <div style={{ margin: '10px 5px' }}>
//         <Masonry
//           breakpointCols={breakpointColumnsObj}
//           className="my-masonry-grid"
//           columnClassName="my-masonry-grid_column"
//         >
//           {coverArr}
//         </Masonry>
//       </div>
//     </div>
//   );

export default Covers;
