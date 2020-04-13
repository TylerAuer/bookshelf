import React from "react";
import SeriesInfo from "./book-details-series-info";

function TitleInfo(props) {
  return (
    <div id="title-info">
      <div>{props.json.title}</div>
      <div>{props.json.subtitle}</div>
      <SeriesInfo json={props.json} />
    </div>
  );
}

export default TitleInfo;
