/** @jsx jsx */
import React from "react";
import TitleInfo from "./book-details-title";
import BookCoverImg from "./book-details-cover";
import { jsx, css } from "@emotion/core";
import Description from "./book-details-description";
import Ratings from "./book-details-ratings";
import TagList from "./tag-list";

function BookDetails(props) {
  return (
    <div
      className="container"
      css={css`
        overflow: hidden;
        margin: 30px auto;
      `}
    >
      <div style={{ float: "right", margin: "10px 5px 10px 25px" }}>
        <BookCoverImg json={props.json} />
      </div>
      <TitleInfo json={props.json} />
      <Description json={props.json} />
      <div style={{ margin: "10px 0px" }}>
        <TagList json={props.json} />
      </div>
      <div style={{ margin: "10px 0px" }}>
        <Ratings json={props.json} />
      </div>
      <div id="links">
        <a href={props.json.amazonUrl}>Amazon</a>
        <a href={props.json.goodreadsUrl}>Goodreads</a>
      </div>
    </div>
  );
}

export default BookDetails;
