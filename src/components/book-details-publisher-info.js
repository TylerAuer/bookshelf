import React from "react";

function PubInfo(props) {
  return (
    <div>
      {props.json.publisher} * {props.json.pubYear}
    </div>
  );
}

export default PubInfo;
