import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import './Single.css';

const BookInfo = ({ data }) => {
  console.log(data);

  // TODO: Refactor this to make it simpler
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
        <span style={{ color: 'grey', fontWeight: 'normal' }}>
          (Translation)
        </span>
      </React.Fragment>
    );
  });

  const illAndTrans = prettyListGenerator([...illustrators, ...translators]);

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
        <div className="single__length">
          <b>Length:</b> {data.pages} pages
        </div>
        <div className="single__series">
          <b>Series:</b> {data.seriesIndex}
        </div>
        <div className="single__rating">
          <b>Rating:</b> {data.ratings.Tyler}
        </div>
        <div className="single__tags">{data.tags}</div>
        <div className="single__links">External Links</div>
      </div>
    </div>
  );
};

const Single = ({ books }) => {
  let { id } = useParams();

  return (
    <div className="container">
      <BookInfo data={books[parseInt(id) - 1]} />
      <Link as="button" to={`/single/${id - 1}`}>
        Previous
      </Link>
      <Link as="button" to={`/single/${parseInt(id) + 1}`}>
        Next
      </Link>
    </div>
  );
};

export default Single;
