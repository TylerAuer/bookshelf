import React from 'react';
import { Link } from 'react-router-dom';
import useQueryObject from '../hooks/useQueryObject';
import queryString from 'query-string';

const FilterTag = ({ type, value }) => {
  const queryObject = useQueryObject();
  let activeClass = '';
  if (queryObject && queryObject[type] && queryObject[type].includes(value)) {
    activeClass = 'filters__label--active';
  }

  const generateNewLocation = (location) => {
    const newLocation = { ...location };
    // no query object
    if (!queryObject) {
      newLocation.search = queryString.stringify(
        { [type]: [value] },
        { arrayFormat: 'bracket' }
      );
    } else if (!queryObject[type]) {
      // query object exists, but this type not yet there
      // so make type and add value
      newLocation.search = queryString.stringify(
        {
          ...queryObject,
          [type]: [value],
        },
        { arrayFormat: 'bracket' }
      );
    } else if (!queryObject[type].includes(value)) {
      // type exists but value isn't in arr, so add value to the array

      // Must make a new copy of the arr for [type] or the router
      // doesn't recognize the location object as new and won't update the
      // history and therefore doesn't change the state of the app
      let newTypeArr = [...queryObject[type]];
      newTypeArr.push(value);

      newLocation.search = queryString.stringify(
        {
          ...queryObject,
          [type]: newTypeArr,
        },
        {
          arrayFormat: 'bracket',
        }
      );
    } else {
      // there's a match, so remove it
      let newTypeArr = queryObject[type].filter((val) => val !== value);
      newLocation.search = queryString.stringify(
        {
          ...queryObject,
          [type]: newTypeArr,
        },
        {
          arrayFormat: 'bracket',
        }
      );
    }

    return newLocation;
  };

  return (
    <Link
      className={`filters__label filters__label--${type} ${activeClass}`}
      to={generateNewLocation}
    >
      {value}
    </Link>
  );
};

export default FilterTag;
