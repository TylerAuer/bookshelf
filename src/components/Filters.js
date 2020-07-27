import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FilterTag from './FilterTag';
import './Filters.css';

const Filters = ({ books, shuffleBookOrder }) => {
  const location = useLocation();

  const listOfYears = [];
  const listOfTags = [];
  for (let id in books) {
    // Adds years if not yet in the list
    if (!listOfYears.includes(books[id].pubYear)) {
      listOfYears.push(books[id].pubYear);
    }
    // Adds tags if not yet in the list
    books[id].tags.forEach((tag) => {
      if (!listOfTags.includes(tag)) {
        listOfTags.push(tag);
      }
    });
  }
  listOfYears.sort().reverse(); // Reverse chronological order
  listOfTags.sort(); // Alphabetical order

  const years = listOfYears.map((year) => {
    return (
      <FilterTag
        key={`year-${year}`}
        parent="filters"
        type="year"
        value={year.toString()}
      />
    );
  });
  const tags = listOfTags.map((tag) => {
    return (
      <FilterTag key={`tag-${tag}`} parent="filters" type="tag" value={tag} />
    );
  });

  return (
    <div className="filters">
      <div className="filters__years">{years}</div>
      <div className="filters__tags">{tags}</div>
      <div className="filters__meta">
        {location.pathname === '/covers' && (
          <button
            className="filters__label filters__label--meta"
            onClick={shuffleBookOrder}
          >
            Shuffle Books
          </button>
        )}
        {location.pathname !== '/covers' && (
          <Link
            to={{
              pathname: '/covers',
              search: location.search,
            }}
          >
            <button className="filters__label filters__label--meta">
              Back to Covers
            </button>
          </Link>
        )}
        <Link to={location.pathname}>
          <button className="filters__label filters__label--meta">
            Clear Filters
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Filters;
