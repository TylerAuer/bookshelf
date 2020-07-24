import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import './Covers.css';

function Covers({ activeBooks }) {
  const location = useLocation();

  const breakpointColumnsObj = {
    default: 9,
    2200: 9,
    1900: 8,
    1650: 7,
    1350: 6,
    1100: 5,
    700: 4,
    500: 3,
  };

  let coverArr = activeBooks.map((book) => {
    return (
      <Link
        key={book.id}
        to={{
          pathname: `/single/${book.id}`,
          search: location.search,
        }}
      >
        <img
          key={book.id}
          className="covers__cover"
          alt={book.title}
          src={require(`../covers/${book.coverImgFileName}`)}
        />
      </Link>
    );
  });

  return (
    // add max-width (2400px) and auto side margins with media query
    <div style={{ position: 'relative' }}>
      <div style={{ margin: '10px 5px' }}>
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

export default Covers;
