import React from "react";
import ReactHtmlParser from "react-html-parser";
import SeriesInfo from "./book-details-series-info";
import PubInfo from "./book-details-publisher-info";
import TitleInfo from "./book-details-title";

function BookDetails(props) {
  // imports cover
  const coverImgSrc = require("../covers/" + props.json.coverImg);

  return (
    <div className="container m-3">
      <div id="cover">
        <img src={coverImgSrc} alt={props.json.title + " cover"} />
      </div>
      <TitleInfo json={props.json} />
      <div id="author">{props.json.author}</div>
      <div id="description">{ReactHtmlParser(props.json.description)}</div>
      <div id="rating">{props.json.rating}</div>
      <div id="links">
        <a href={props.json.amazonUrl}>Amazon</a>
        <a href={props.json.goodreadsUrl}>Goodreads</a>
      </div>
      <PubInfo json={props.json} />
    </div>
  );
}

export default BookDetails;
