import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FilterTag from './FilterTag';
import './Filters.css';
import ShowHideFiltersBtn from './ShowHideFiltersBtn';
import useQueryObject from '../hooks/useQueryObject';

const Filters = ({ yearMap, tagMap, shuffleBookOrder }) => {
  const location = useLocation();
  const queryObj = useQueryObject();

  // Use the maps to make list of years and tags
  let listOfYears = Object.keys(yearMap);
  let listOfTags = Object.keys(tagMap);

  // Sort the years and tags
  listOfYears.sort().reverse(); // Reverse chronological order
  listOfTags.sort(); // Alphabetical order

  // Unless a user clicks the "Show More Button", only the filters below
  // and any active filters are shown
  const filtersToAlwaysShow = [
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    'Fantasy',
    'Graphic Novel',
    'Judge me by my cover',
    'Must Listen',
    'Nonfiction',
    'Picture Book',
    'Math & Science',
    "Where we're going we don't need roads",
  ];

  // Handle the case where no filters are applied and show more is NOT selected
  if (!queryObj || !queryObj.allFilters) {
    listOfYears = listOfYears.filter(
      (year) =>
        filtersToAlwaysShow.includes(year) ||
        (queryObj && queryObj.year && queryObj.year.includes(year.toString()))
    );
    listOfTags = listOfTags.filter(
      (tag) =>
        filtersToAlwaysShow.includes(tag) ||
        (queryObj && queryObj.tag && queryObj.tag.includes(tag))
    );
  }

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
      <div className="filters__years">
        {years}
        {tags}
        <ShowHideFiltersBtn />
      </div>
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
