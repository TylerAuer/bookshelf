import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import StackGrid from 'react-stack-grid';
import './Covers.css';

function Covers({ activeBooks }) {
  const location = useLocation();

  let listOfCovers = activeBooks.map((book) => {
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
    <div className="grid">
      <StackGrid
        gutterWidth={20}
        gutterHeight={20}
        columnWidth={250}
        monitorImagesLoaded={true}
        appearDelay={100}
      >
        {listOfCovers}
      </StackGrid>
    </div>
  );
}

export default Covers;
