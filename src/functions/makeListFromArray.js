import React from 'react';

const makeListFromArray = (arr) => {
  let jsxArr = [];
  let contributorArr = arr.slice();
  while (contributorArr.length > 0) {
    if (contributorArr.length > 2) {
      jsxArr.push(
        <React.Fragment key={contributorArr[0]}>
          {contributorArr.shift()}
          <span
            style={{
              color: 'black',
              fontWeight: 'normal',
            }}
          >
            ,{' '}
          </span>
        </React.Fragment>
      );
    } else if (contributorArr.length === 2) {
      jsxArr.push(
        <React.Fragment key={contributorArr[0]}>
          {contributorArr.shift()}
          <span
            style={{
              color: 'black',
              fontWeight: 'normal',
            }}
          >
            {' '}
            &{' '}
          </span>
        </React.Fragment>
      );
    } else {
      jsxArr.push(
        <React.Fragment key={contributorArr}>
          {contributorArr.shift()}
        </React.Fragment>
      );
    }
  }
  return jsxArr;
};

export default makeListFromArray;
