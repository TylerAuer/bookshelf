import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import makeListFromArray from '../functions/makeListFromArray';
import makeStars from '../functions/makeStars';
import books from '../books.json';
import './List.css';

const BookInList = ({ book, index }) => {
  const location = useLocation();
  const leftOrRightColumn =
    index % 2 ? 'list__book--right' : 'list__book--left';

  return (
    <div className={`list__book ${leftOrRightColumn}`}>
      <Link
        to={{
          pathname: `/single/${book.id}`,
          search: location.search,
        }}
      >
        <img
          src={require(`../covers/${book.coverImgFileName}`)}
          alt={`Cover of ${book.title}`}
          className="list__cover"
        />
      </Link>
      <div className="list__details">
        <Link
          to={{
            pathname: `/single/${book.id}`,
            search: location.search,
          }}
          className="list__title"
        >
          {book.title}
        </Link>
        <div className="list__authors">{makeListFromArray(book.authors)}</div>
        <div className="list__stars">{makeStars(book.ratings.Tyler)}</div>
      </div>
    </div>
  );
};

const Lists = ({ activeBookIDs }) => {
  const animations = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.molasses,
  });

  const ListOfBooks = activeBookIDs.map((bookId, index) => {
    const book = books[bookId];
    return <BookInList index={index} key={book.id} book={book} />;
  });

  return (
    <animated.div className="list__container" style={animations}>
      {ListOfBooks}
    </animated.div>
  );
};

export default Lists;
