import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import './Single.css';

const BookInfo = ({ data }) => {
  console.log(data);

  ////////////////////////////////////////////////////////
  // Author, Illustrator, and Translator Lists
  ////////////////////////////////////////////////////////
  const prettyListGenerator = (arr) => {
    let jsxArr = [];
    let contributorArr = arr.slice();
    while (contributorArr.length > 0) {
      if (contributorArr.length > 2) {
        jsxArr.push(
          <React.Fragment>
            {contributorArr.shift()}
            <span
              style={{
                color: 'black',
                fontWeight: 'normal',
              }}
            >
              ,{' '}
            </span>
          </React.Fragment>
        );
      } else if (contributorArr.length === 2) {
        jsxArr.push(
          <React.Fragment>
            {contributorArr.shift()}
            <span
              style={{
                color: 'black',
                fontWeight: 'normal',
              }}
            >
              {' '}
              &{' '}
            </span>
          </React.Fragment>
        );
      } else {
        jsxArr.push(<React.Fragment>{contributorArr.shift()}</React.Fragment>);
      }
    }
    return jsxArr;
  };

  const authors = prettyListGenerator(data.authors);
  const illustrators = data.illustrators.map((ill) => {
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
  const translators = data.translators.map((trans) => {
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
  const illAndTrans = prettyListGenerator([...illustrators, ...translators]);

  ////////////////////////////////////////////////////////
  // Stars for Ratings
  ////////////////////////////////////////////////////////
  let stars = [];
  for (let i = 1; i < 6; i++) {
    if (i <= data.ratings.Tyler) {
      stars.push(
        <span key={i} className="single__star single__star--lit">
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="single__star single__star--dim">
          ★
        </span>
      );
    }
  }

  ////////////////////////////////////////////////////////
  // Tags and External Links
  ////////////////////////////////////////////////////////

  const tags = data.tags.map((tag) => {
    // link to covers with query for the tag
    return (
      <Link
        to={{
          pathname: '/books/covers',
          search: tag,
        }}
        className="single__tag"
      >
        {tag}
      </Link>
    );
  });

  const externalLinks = Object.entries(data.extLinks).map((link) => {
    return (
      <a className="single__tag single__tag--external" href={link[1]}>
        {link[0]}
      </a>
    );
  });

  return (
    <div className="single">
      <img
        src={require(`../covers/${data.coverImgFileName}`)}
        alt={`Cover of ${data.title}`}
        className="single__cover"
      />

      <div className="single__header">
        <div className="single__titles">
          <div className="single__title">{data.title}</div>
          <div className="single__subtitle">{data.subtitle}</div>
        </div>
        <div className="single__creators">
          <div className="single__authors">{authors}</div>
          <div className="single__ill-and-trans">{illAndTrans}</div>
        </div>
      </div>

      <div className="single__body">
        <div className="single__desc">{ReactHtmlParser(data.desc)}</div>
      </div>

      <div className="single__footer">
        {data.pages && (
          <div className="single__length">
            <b>Length:</b> {data.pages} pages
          </div>
        )}
        {data.seriesIndex && (
          <div className="single__series">
            <b>Series:</b> {data.seriesIndex} of {data.seriesLength} in{' '}
            {data.seriesTitle}
          </div>
        )}
        {data.ratings.Tyler && (
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
      <BookInfo data={books[parseInt(id) - 1]} />
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
