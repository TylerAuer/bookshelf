import React from 'react';

const makeStars = (numOfStars) => {
  const stars = [];
  for (let i = 1; i < 6; i++) {
    if (i <= numOfStars) {
      stars.push(
        <span key={i} className="single__star single__star--lit">
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="single__star single__star--dim">
          ★
        </span>
      );
    }
  }
  return stars;
};

export default makeStars;
