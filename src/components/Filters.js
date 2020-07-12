import React from 'react';
import FilterTag from './FilterTag';
import './Filters.css';

const Filters = ({ books }) => {
  const listOfYears = [];
  const listOfTags = [];
  books.forEach((book) => {
    // Adds years if not yet in the list
    if (!listOfYears.includes(book.pubYear)) {
      listOfYears.push(book.pubYear);
    }
    // Adds tags if not yet in the list
    book.tags.forEach((tag) => {
      if (!listOfTags.includes(tag)) {
        listOfTags.push(tag);
      }
    });
  });
  listOfYears.sort().reverse(); // Reverse chronological order
  listOfTags.sort(); // Alphabetical order

  const years = listOfYears.map((year) => {
    return (
      <FilterTag key={`year-${year}`} type="year" value={year.toString()} />
    );
  });
  const tags = listOfTags.map((tag) => {
    return <FilterTag key={`tag-${tag}`} type="tag" value={tag} />;
  });

  return (
    <div className="container filters">
      <div className="filters__years">{years}</div>
      <div className="filters__tags">{tags}</div>
    </div>
  );
};

export default Filters;
