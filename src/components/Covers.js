import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
        <CSSTransition in appear timeout={5000} classNames="covers__cover">
          <img
            className="covers__cover"
            key={book.id}
            alt={book.title}
            src={require(`../covers/${book.coverImgFileName}`)}
          />
        </CSSTransition>
      </Link>
    );
  });

  const masonry = () => {
    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      />
    );
  };

  return (
    // add max-width (2400px) and auto side margins with media query
    <div style={{ position: 'relative' }}>
      <div style={{ margin: '10px 5px' }}>
        <TransitionGroup appear enter exit>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {coverArr}
          </Masonry>
        </TransitionGroup>
      </div>
    </div>
  );
}

export default Covers;
