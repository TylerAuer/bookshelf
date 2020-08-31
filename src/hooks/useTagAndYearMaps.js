import books from '../books.json';

// Maps years and tags to arrays containing the book IDs for
// each book that matches the year or tag. For example, accessing
// yearMap["2020"] will return an array of book IDs for the books published in
// 2020
export default function useTagAndYearMaps() {
  const yearMap = {};
  const tagMap = {};

  // Populate maps of years and tags
  Object.values(books).forEach((book) => {
    // Add book to the pub year map
    if (yearMap[book.pubYear]) {
      yearMap[book.pubYear].push(book.id);
    } else {
      yearMap[book.pubYear] = [book.id];
    }

    // Add book to tags map
    book.tags.forEach((tag) => {
      if (tagMap[tag]) {
        tagMap[tag].push(book.id);
      } else {
        tagMap[tag] = [book.id];
      }
    });
  });

  return { yearMap, tagMap };
}
