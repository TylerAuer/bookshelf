import React from 'react';
import Masonry from 'react-masonry-css';
import './Covers.css';
import { Link } from 'react-router-dom';

function Covers({ books }) {
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

  let coverArr = books.map((book) => {
    return (
      <Link to={`/single/${book.id}`}>
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
