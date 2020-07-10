/** @jsx jsx */
import React, { useState } from "react";
import { jsx, css } from "@emotion/core";
import { theme } from "../css-variables";
import BookDetailsModal from "./book-details-modal";

const coverImgStyle = css`
  width: 100%;
  max-width: 275px;
  height: auto;
  margin: 0px auto;
  &:hover {
    webkit-filter: blur(2px); /* Chrome, Safari, Opera */
    filter: blur(2px);
  }
`;

function BookCoverImg(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // imports cover
  const coverImgSrc = require("../covers/" + props.json.coverImgFileName);

  return (
    <React.Fragment>
      <img
        css={coverImgStyle}
        src={coverImgSrc}
        alt={props.json.title + " cover"}
        id={props.json.id}
        onClick={() => setIsModalOpen(true)}
      />
      <BookDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        json={props.json}
      />
    </React.Fragment>
  );
}

export default BookCoverImg;
