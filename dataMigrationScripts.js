/* 
This file is used to make changes to the structure of data.json. It should
only be run when the current state of data is backed up.
*/

const fs = require('fs');
const books = require('./src/books.json');
var sizeOf = require('image-size');

/**
 * Converted data from array of objects into one big object
 * for more efficient lookups. This required a change to the scraper.py
 */
// const newData = {};
// for (let book of data.books) {
//   newData[book.id] = { ...book };
// }
// let newDataAsJSON = JSON.stringify(newData, null, 2);
// fs.writeFileSync('updatedData.json', newDataAsJSON);

/**
 * Get image dimensions, add height/width ratio to books.json
 * Used for masonry grid
 */
const newData = {};
for (let book in books) {
  // get height and width of cover img
  const imgSize = sizeOf(`./src/covers/${books[book].coverImgFileName}`);

  // add height, width and ratio to object
  const coverImgInfo = {
    ...imgSize,
    heightDividedByWidth: imgSize.height / imgSize.width,
  };

  // remove unwanted info from object
  delete coverImgInfo.type;
  if (coverImgInfo.orientation) {
    delete coverImgInfo.orientation;
  }

  newData[book] = { ...books[book], coverImgInfo };
}

let newDataAsJSON = JSON.stringify(newData, null, 2);
fs.writeFileSync('updatedData.json', newDataAsJSON);
