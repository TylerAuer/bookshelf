/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme } from "../css-variables";

const coverImgStyle = css`
  width: 100%;
  max-width: 275px;
  height: auto;
  margin: 0px auto;
  &:hover {
    /* border: 2px solid ${theme.mainColorLight}; */
    webkit-filter: blur(2px); /* Chrome, Safari, Opera */
    filter: blur(2px);
  }
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
