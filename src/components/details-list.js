import React from "react";
import BookDetails from "./book-details";

function DetailsList(props) {
  let bookArr = [];
  props.json.forEach((book, index) => {
    bookArr.push(<BookDetails key={book.id} json={book} />);
  });
  return <React.Fragment>{bookArr}</React.Fragment>;
}

export default DetailsList;
