/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const coverImgStyle = css`
  width: 200px;
  height: auto;
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
