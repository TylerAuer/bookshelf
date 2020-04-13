import React from "react";

function BookDetails(props) {
  // imports cover
  const coverImgSrc = require("../covers/" + props.json.coverImg);

  return (
    <div>
      <div id="cover">
        <img src={coverImgSrc} alt={props.json.title + " cover"} />
      </div>
      <div id="title">{props.json.title}</div>
      <div id="subtitle">{props.json.subtitle}</div>
      <div id="author">{props.json.author}</div>
      <div id="publisher">{props.json.publisher}</div>
      <div id="pub-year">{props.json.pubYear}</div>
      <div id="description">{parsedDesc.body}</div>
      <div id="rating">{props.json.rating}</div>
      <div id="links">
        <a href={props.json.amazonUrl}>Amazon</a>
        <a href={props.json.goodreadsUrl}>Goodreads</a>
      </div>
    </div>
  );
}

export default BookDetails;
