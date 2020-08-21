import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useQueryObject from '../hooks/useQueryObject';

const ShowHideFiltersBtn = (props) => {
  const location = useLocation();
  const queryObj = useQueryObject();

  const btnText = queryObj && queryObj.allFilters ? 'Show Fewer' : 'Show More';
  let newQueryString;

  // Show More with a previous query
  if (btnText === 'Show More' && queryObj) {
    newQueryString = location.search + '&allFilters=true';
  } else if (btnText === 'Show More' && !queryObj) {
    // Show more without a query
    newQueryString = '?allFilters=true';
  } else {
    // Must be a query string and it must include 'allFilters=true'
    newQueryString = location.search
      .replace('&allFilters=true', '') // replaces when & in front
      .replace('allFilters=true', ''); // replaces when no & in front
  }

  return (
    <Link
      to={{
        to: location.pathname,
        search: newQueryString,
      }}
      className="filters__show-hide"
    >
      {btnText}
    </Link>
  );
};

export default ShowHideFiltersBtn;
