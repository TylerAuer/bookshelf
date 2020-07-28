import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import useResponsiveDimensions from '../hooks/useResponsiveDimensions';
import './Covers.css';

function Covers({ activeBooks }) {
  const location = useLocation();
  // Detects dimensions of the masonry container
  const componentRef = useRef();
  const { width: gridWidth } = useResponsiveDimensions(componentRef);

  // Before useResponsiveDimension calculates the width, it returns 0
  // This messes with the calculations for xOffset and yOffset below
  // causing the books to animate in a weird way on page load
  // This if statement prevents the books from rendering until
  // a width is determined
  if (gridWidth === 0) {
    activeBooks = [];
  }

  // Adjust masonry grid based on width of the grid
  // default values
  let columns = 3;
  let gutter = 6;

  if (gridWidth > 700) {
    columns = 4;
    gutter = 8;
  }

  if (gridWidth > 800) {
    columns = 5;
    gutter = 8;
  }

  if (gridWidth > 1100) {
    columns = 6;
    gutter = 12;
  }

  if (gridWidth > 1500) {
    columns = 7;
    gutter = 15;
  }

  if (gridWidth > 1800) {
    columns = 8;
  }

  if (gridWidth > 2000) {
    columns = 9;
  }

  if (gridWidth > 2300) {
    columns = 10;
  }

  // Responsively set columns and gutter size

  const columnWidth = Math.floor(gridWidth / columns);
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
      enter: ({ xOffset, yOffset }) => ({
        left: xOffset,
        top: yOffset,
        opacity: 1,
      }),
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
        <Link
          key={item.id}
          to={{
            pathname: `/single/${item.id}`,
            search: location.search,
          }}
        >
          <animated.img
            className="covers__cover-image"
            key={key}
            src={require(`../covers/${item.imgFileName}`)}
            style={{
              width: item.imgWidth,
              height: item.imgHeight,
              position: 'absolute',
              ...props,
            }}
          />{' '}
        </Link>
      ))}
    </div>
  );
}

export default Covers;
