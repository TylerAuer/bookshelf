import data from '../data.json';
import useQueryObject from './useQueryObject';

const useActiveBooks = () => {
  const queryObject = useQueryObject();
  const activeBooks = [];

  // If there is no query string
  if (!queryObject) {
    // Return all books
    return data.books;
  }

  // TODO: OPTIMIZATION: Right now this runs every time the query string changes
  // Instead I could generate objects with lists of IDs for books that match
  // And then I could just grab the relevant IDs everytime the query string
  data.books.forEach((book) => {
    let shouldBookBeAdded = false;

    // check if year matches
    if (queryObject.year) {
      // for each year in the query
      queryObject.year.forEach((year) => {
        // if the year in the query matches the publishing year
        if (book.pubYear === parseInt(year)) {
          shouldBookBeAdded = true;
        }
      });
    }
    // check if tag matches
    if (queryObject.tag) {
      // for each tag in query
      book.tags.forEach((tag) => {
        // if the book shares the tag
        if (queryObject.tag.includes(tag)) {
          shouldBookBeAdded = true;
        }
      });
    }

    if (shouldBookBeAdded) {
      activeBooks.push(book);
    }
  });

  return activeBooks;
};

export default useActiveBooks;
