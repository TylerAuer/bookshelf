import React from "react";

function SeriesInfo(props) {
  if (props.json.seriesIndex) {
    return (
      <div id="series-info">
        {props.json.seriesIndex} of {props.json.seriesLength} in{" "}
        <i>{props.json.seriesTitle}</i>
      </div>
    );
  }
  return null;
}

export default SeriesInfo;
