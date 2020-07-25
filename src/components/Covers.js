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
  const gutter = 10;
  const columnHeights = new Array(columns).fill(0);

  // Iterate over each cover
  const masonryGrid = activeBooks.map((book) => {
    // Find the column with the smallest cumulative height
    const indexOfShortestColumn = columnHeights.indexOf(
      Math.min(...columnHeights)
    );
    // Use the column index to determine the x coordinate
    const xOffset = columnWidth * indexOfShortestColumn + gutter / 2;
    // Use the column's height to determine the y coordinate
    const yOffset = columnHeights[indexOfShortestColumn];
    // Calculate the image's width and height including the gutter
    const imgWidth = columnWidth - gutter;
    const imgHeight =
      (columnWidth - gutter) * book.coverImgInfo.heightDividedByWidth;
    // Add the image's height to the column's previous height
    columnHeights[indexOfShortestColumn] += imgHeight + gutter;

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
            width: imgWidth,
            height: imgHeight,
          }}
        />
      </div>
    );
  });

  return (
    <div
      ref={componentRef}
      id="covers__container"
      style={{ position: 'relative' }}
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
