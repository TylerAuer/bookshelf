/** @jsx jsx */
import React from "react";
import TitleInfo from "./book-details-title";
import BookCoverImg from "./book-cover";
import { jsx, css } from "@emotion/core";
import Description from "./book-details-description";
import Ratings from "./book-details-ratings";
import TagList from "./tag-list";
import ShopLinkList from "./shop-link-list";
import SeriesInfo from "./book-details-series";
import Pages from "./book-details-pages";

function BookDetails(props) {
  return (
    <div
      className="container"
      css={css`
        overflow: hidden;
        margin: 30px auto;
      `}
    >
      <div className="row">
        <div className="col-sm-3 order-sm-2 text-center">
          <BookCoverImg json={props.json} />
        </div>

        <div className="col-sm-9">
          <TitleInfo json={props.json} />
          <Description json={props.json} />
          <Pages json={props.json} />
          <SeriesInfo json={props.json} />
          <Ratings json={props.json} />
          <div style={{ margin: "10px 0px" }}>
            <div style={{ overflow: "hidden", margin: "5px 0px" }}>
              <TagList json={props.json} />
            </div>
            <div style={{ overflow: "hidden", margin: "5px 0px" }}>
              <ShopLinkList json={props.json} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
