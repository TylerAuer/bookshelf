import React from 'react';
import { useParams } from 'react-router-dom';

const BookInfo = ({ data }) => {
  console.log(data);
  return (
    <div className="container">
      <div className="single">
        <div className="single__title">{data.title}</div>
        <div className="single__subtitle">{data.subtitle}</div>
        <div className="single__author">{data.author}</div>
        <div className="single__illustrator">{data.illustrator}</div>
        <div className="single__translator">{data.translator}</div>
      </div>
    </div>
  );
};

const Single = ({ books }) => {
  let { id } = useParams();

  return <BookInfo data={books[parseInt(id) - 1]} />;
};

export default Single;
