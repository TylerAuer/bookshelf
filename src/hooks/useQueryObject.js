import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

// Pulls the URL query and returns the information as an object
const useQueryObject = () => {
  const location = useLocation();

  // Turns query string in URL into object
  const queryObject = queryString.parse(location.search);

  // Returns null if there is no query string
  if (!Object.keys(queryObject).length) {
    return null;
  }

  return queryObject;
};

export default useQueryObject;
