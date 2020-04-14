/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const coverImgStyle = css`
  width: 100%;
  max-width: 250px;
  height: auto;
  margin: 0px auto;
`;

function BookCoverImg(props) {
  // imports cover
  const coverImgSrc = require("../covers/" + props.json.coverImg);

  return (
    <img
      css={coverImgStyle}
      src={coverImgSrc}
      alt={props.json.title + " cover"}
    />
  );
}

export default BookCoverImg;
