/* 
This file is used to make changes to the structure of data.json. It should
only be run when the current state of data is backed up.
*/

const fs = require('fs');
const data = require('./src/data.json');

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
