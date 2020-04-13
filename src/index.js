import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import BookDetails from "./components/book-details";

const bookData = require("./book-data.json");
let bookArr = [];
bookData.forEach((book, index) => {
  bookArr.push(<BookDetails key={index} json={book} />);
});

ReactDOM.render(
  <React.StrictMode>{bookArr}</React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
