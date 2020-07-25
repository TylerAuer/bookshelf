import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import useResponsiveDimensions from '../hooks/useResponsiveDimensions';

function Covers({ activeBooks }) {
  const location = useLocation();
  // Detects dimensions of the masonry container
  const componentRef = useRef();
  const { width: gridWidth, height: gridHeight } = useResponsiveDimensions(
    componentRef
  );

  // Before useResponsiveDimension calculates the width, it returns 0
  // This messes with the calculations for xOffset and yOffset below
  // causing the books to animate in a weird way on page load
  // This if statement prevents the books from rendering until
  // a width is determined
  if (gridWidth === 0) {
    activeBooks = [];
  }

  const columns = 7;
  const columnWidth = Math.floor(gridWidth / columns);
  const gutter = 15;
  const columnHeights = new Array(columns).fill(0);

  // Creates array of book objects that includes their dimensions & positions
  const booksWithPositionAndDimensions = activeBooks.map((book) => {
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

    if (book.id === 1) {
      console.log(`
x: ${xOffset}, y: ${yOffset}
gridWidth: ${gridWidth}
      `);
    }

    return {
      id: book.id,
      alt: book.title,
      xOffset: xOffset,
      yOffset: yOffset,
      imgWidth: imgWidth,
      imgHeight: imgHeight,
      imgFileName: book.coverImgFileName,
    };
  });

  // Try using transform instead of top and left?
  const transitions = useTransition(
    booksWithPositionAndDimensions,
    (book) => book.id,
    {
      from: ({ xOffset, yOffset }) => ({
        left: xOffset,
        top: yOffset,
        opacity: 0,
      }),
      enter: { opacity: 1 },
      update: ({ xOffset, yOffset }) => ({
        left: xOffset,
        top: yOffset,
      }),
      leave: { opacity: 0 },
      config: { mass: 5, tension: 500, friction: 100 },
      trail: 15,
      unique: true,
    }
  );

  return (
    <div
      ref={componentRef}
      id="covers__container"
      style={{ position: 'relative' }}
    >
      {transitions.map(({ item, props, key }) => (
        <animated.img
          key={key}
          src={require(`../covers/${item.imgFileName}`)}
          style={{
            width: item.imgWidth,
            height: item.imgHeight,
            position: 'absolute',
            ...props,
          }}
        />
      ))}
    </div>
  );
}

///////////////////////////////////////////
// When I had masonry working on my own
//////////////////////////////////////////
//
// return (
//   <div
//     style={{
//       left: `${xOffset}px`,
//       top: `${yOffset}px`,
//       position: 'absolute',
//     }}
//   >
//     <img
//       key={key}
//       className="covers__single-cover"
//       alt={item.title}
//       src={require(`../covers/${item.coverImgFileName}`)}
//       style={{
//         ...props,
//         width: imgWidth,
//         height: imgHeight,
//       }}
//     />
//   </div>
// );

////////////////////////////////////
// Before I began revamping this
////////////////////////////////////
//
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
