import books from '../books.json';
import useQueryObject from './useQueryObject';
import useTagAndYearMaps from './useTagAndYearMaps';

// Finds bookIds of books that should be displayed based on the query string
// which shows the filters being applied
//
// Defaults to all books if no filters / query string exists
const useFilteredBookIDs = () => {
  const queryObject = useQueryObject();
  const { yearMap, tagMap } = useTagAndYearMaps();

  // If there is no query string OR
  // queryObj doesn't include tag or year
  if (!queryObject || (!queryObject.tag && !queryObject.year)) {
    // Return all book IDs
    let filteredBookIDs = Object.keys(books);
    return { filteredBookIDs, yearMap, tagMap };
  }

  // Filters are selected so get book IDs that are needed
  let filteredBookIDs = new Set();

  if (queryObject.year) {
    queryObject.year.forEach((year) => {
      yearMap[year].forEach((bookId) => {
        filteredBookIDs.add(bookId.toString());
      });
    });
  }

  if (queryObject.tag) {
    queryObject.tag.forEach((tag) => {
      tagMap[tag].forEach((bookId) => {
        filteredBookIDs.add(bookId.toString());
      });
    });
  }

  filteredBookIDs = [...filteredBookIDs];
  return { filteredBookIDs, yearMap, tagMap };
};

export default useFilteredBookIDs;
