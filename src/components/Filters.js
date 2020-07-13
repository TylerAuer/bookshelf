import React from 'react';
import FilterTag from './FilterTag';
import books from '../books.json';
import './Filters.css';

const Filters = (props) => {
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
