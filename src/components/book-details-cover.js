/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const coverImgStyle = css`
  width: 200px;
  height: auto;
  float: right;
  margin: 10px;
`;

function BookCoverImg(props) {
  // imports cover
  const coverImgSrc = require("../covers/" + props.json.coverImg);

  return (
    <div id="cover">
      <img
        css={coverImgStyle}
        src={coverImgSrc}
        alt={props.json.title + " cover"}
      />
    </div>
  );
}

export default BookCoverImg;
