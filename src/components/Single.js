import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import ReactHtmlParser from 'react-html-parser';
import makeListFromArray from '../functions/makeListFromArray';
import makeStars from '../functions/makeStars';
import FilterTag from './FilterTag';
import './Single.css';

const BookInfo = ({ book }) => {
  // add label and styles to illustrators
  const illustrators = book.illustrators.map((ill) => {
    return (
      <React.Fragment>
        {ill}{' '}
        <span
          style={{
            color: 'grey',
            fontWeight: 'normal',
          }}
        >
          (Illustrations)
        </span>
      </React.Fragment>
    );
  });
  // add label and styles to translators
  const translators = book.translators.map((trans) => {
    return (
      <React.Fragment>
        {trans}{' '}
        <span
          style={{
            color: 'grey',
            fontWeight: 'normal',
          }}
        >
          (Translation)
        </span>
      </React.Fragment>
    );
  });

  // Turn arrays into nice lists with commas and ampersands
  const authors = makeListFromArray(book.authors);
  const illAndTrans = makeListFromArray([...illustrators, ...translators]);

  // Generate the styled stars
  let stars = makeStars(book.ratings.Tyler);

  ////////////////////////////////////////////////////////
  // Tags and External Links
  ////////////////////////////////////////////////////////

  const tags = book.tags.map((tag) => {
    // link to covers with query for the tag
    return <FilterTag key={tag} parent="single" type="tag" value={tag} />;
  });

  const externalLinks = Object.entries(book.extLinks).map((link) => {
    return (
      <a key={link[0]} className="single__external-tag" href={link[1]}>
        {link[0]}
      </a>
    );
  });

  return (
    <div className="single">
      <img
        src={require(`../covers/${book.coverImgFileName}`)}
        alt={`Cover of ${book.title}`}
        className="single__cover"
      />

      <div className="single__header">
        <div className="single__titles">
          <div className="single__title">{book.title}</div>
          <div className="single__subtitle">{book.subtitle}</div>
        </div>
        <div className="single__creators">
          <div className="single__authors">{authors}</div>
          <div className="single__ill-and-trans">{illAndTrans}</div>
        </div>
      </div>

      <div className="single__body">
        <div className="single__desc">{ReactHtmlParser(book.desc)}</div>
      </div>

      <div className="single__footer">
        {book.ratings.Tyler && (
          <div className="single__ratings">
            <b>Rating: </b>
            {stars}
          </div>
        )}
        {book.pages && (
          <div className="single__length">
            <b>Length: </b>
            {book.pages} pages
          </div>
        )}
        {book.seriesIndex && (
          <div className="single__series">
            <b>Series: </b>
            {book.seriesIndex} of {book.seriesLength} in {book.seriesTitle}{' '}
            series
          </div>
        )}
        {book.pubYear && (
          <div className="single__pub-year">
            <b>Released: </b>
            {book.pubYear}
          </div>
        )}
        {book.isbn10 && (
          <div className="single__pub-info">
            <b>ISBN-10: </b>
            {book.isbn10}
          </div>
        )}
        {book.isbn13 && (
          <div className="single__pub-info">
            <b>ISBN-13: </b>
            {book.isbn13}
          </div>
        )}
        <div className="single__tags-and-links">
          <div className="single__tag-list">{tags}</div>
          <div className="single__tag-list">{externalLinks}</div>
        </div>
      </div>
    </div>
  );
};

const Single = ({ books, activeBookIDs }) => {
  let { id } = useParams();
  const location = useLocation();
  const animations = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.molasses,
  });

  /* If the user changes the filters while on the single page, and the current
  book is no longer included in the activeBookIDs, then currentIndex === -1.

  This works out nicely because then both the previousBtnLink and nextBtnLink 
  automatically switch over to the new list of IDs. It can be hard to see why
  this works out, so watching currentIndex and lastIndex with console.log()
  can help clarify */
  const currentIndex = activeBookIDs.indexOf(id);
  const lastIndex = activeBookIDs.length - 1;

  const disabled =
    activeBookIDs.length === 1 ? 'single__bottom-nav-btn--disabled' : '';

  const previousBtnLink =
    currentIndex > 0
      ? `/single/${activeBookIDs[currentIndex - 1]}`
      : `/single/${activeBookIDs[lastIndex]}`;

  const nextBtnLink =
    currentIndex === lastIndex
      ? `/single/${activeBookIDs[0]}`
      : `/single/${activeBookIDs[currentIndex + 1]}`;

  return (
    <animated.div style={animations} className="container single">
      <BookInfo book={books[id]} />
      <nav className="single__bottom-nav">
        <Link
          className={`single__bottom-nav-btn single__bottom-nav-btn--previous ${disabled}`}
          as="button"
          to={{
            pathname: previousBtnLink,
            search: location.search,
          }}
        >
          Previous
        </Link>
        <Link
          className={`single__bottom-nav-btn single__bottom-nav-btn--next ${disabled}`}
          as="button"
          to={{
            pathname: nextBtnLink,
            search: location.search,
          }}
        >
          Next
        </Link>
      </nav>
    </animated.div>
  );
};

export default Single;
