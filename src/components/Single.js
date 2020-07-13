import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import makeListFromArray from '../functions/makeListFromArray';
import makeStars from '../functions/makeStars';
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
    return (
      <Link
        to={{
          pathname: '/covers',
          search: tag,
        }}
        className="single__tag"
      >
        {tag}
      </Link>
    );
  });

  const externalLinks = Object.entries(book.extLinks).map((link) => {
    return (
      <a className="single__tag single__tag--external" href={link[1]}>
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
        {book.pages && (
          <div className="single__length">
            <b>Length:</b> {book.pages} pages
          </div>
        )}
        {book.seriesIndex && (
          <div className="single__series">
            <b>Series:</b> {book.seriesIndex} of {book.seriesLength} in{' '}
            {book.seriesTitle}
          </div>
        )}
        {book.ratings.Tyler && (
          <div className="single__ratings">
            <b>Rating: {stars}</b>
          </div>
        )}
        <div className="single__tag-list">{tags}</div>
        <div className="single__tag-list">{externalLinks}</div>
      </div>
    </div>
  );
};

const Single = ({ books }) => {
  let { id } = useParams();
  return (
    <div className="container">
      <BookInfo book={books[id]} />
      <nav className="single__bottom-nav">
        <Link
          className="single__bottom-nav-btn single__bottom-nav-btn--previous"
          as="button"
          to={`/single/${id - 1}`}
        >
          Previous
        </Link>
        <Link
          className="single__bottom-nav-btn single__bottom-nav-btn--next"
          as="button"
          to={`/single/${parseInt(id) + 1}`}
        >
          Next
        </Link>
      </nav>
    </div>
  );
};

export default Single;
