/** @jsx jsx */
import React from "react";
import ReactHtmlParser from "react-html-parser";
import PubInfo from "./book-details-publisher-info";
import TitleInfo from "./book-details-title";
import BookCoverImg from "./book-details-cover";
import { jsx, css } from "@emotion/core";

function BookDetails(props) {
  return (
    <div
      className="container"
      css={css`
        overflow: hidden;
        margin: 20px auto;
      `}
    >
      <BookCoverImg json={props.json} />
      <TitleInfo json={props.json} />
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
