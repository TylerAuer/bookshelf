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
        const lowerCaseTag = tag.toLowerCase();
        // if the book shares the tag
        if (queryObject.tag.includes(lowerCaseTag)) {
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
