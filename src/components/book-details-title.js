/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const titleDivStyles = css`
  font-weight: bold;
  line-height: 1.2;
  margin: 0px 0px 10px 0px;

  #title {
    font-size: 40px;
    margin: 5px 0px;
  }
  #author {
    font-size: 24px;
    color: #c45ec4;
    margin: 5px 0px;
  }
  #trans-illust {
    font-size: 20px;
    color: black;
    font-weight: normal;
    margin: 5px 0px;
  }
  #subtitle {
    font-size: 20px;
    font-weight: normal;
    font-style: italic;
    margin: 5px 0px;
  }
`;

function TitleInfo(props) {
  const prettyListGenerator = (arr) => {
    let jsxArr = [];
    let contributorArr = arr.slice();
    while (contributorArr.length > 0) {
      if (contributorArr.length > 2) {
        jsxArr.push(
          <React.Fragment>
            {contributorArr.shift()}
            <span style={{ color: "black", fontWeight: "normal" }}>, </span>
          </React.Fragment>
        );
      } else if (contributorArr.length === 2) {
        jsxArr.push(
          <React.Fragment>
            {contributorArr.shift()}
            <span style={{ color: "black", fontWeight: "normal" }}> & </span>
          </React.Fragment>
        );
      } else {
        jsxArr.push(<React.Fragment>{contributorArr.shift()}</React.Fragment>);
      }
    }
    return jsxArr;
  };
  // Generates Author, Illustrators, Translators Lists
  const authorJSX = prettyListGenerator(props.json.authors);

  // Adds illustrator labels to illustrators
  const illusWithLabels = props.json.illustrators.map((ill) => {
    return (
      <React.Fragment>
        {ill}{" "}
        <span style={{ color: "grey", fontWeight: "normal" }}>
          (Illustrations)
        </span>
      </React.Fragment>
    );
  });
  // Adds translation label to translators
  const transWithLabels = props.json.translators.map((trans) => {
    return (
      <React.Fragment>
        {trans}{" "}
        <span style={{ color: "grey", fontWeight: "normal" }}>
          (Translation)
        </span>
      </React.Fragment>
    );
  });
  const illAndTransArr = illusWithLabels.concat(transWithLabels);
  const transIllJSX = prettyListGenerator(illAndTransArr);

  return (
    <div css={titleDivStyles}>
      <div id="title">{props.json.title}</div>
      <div id="author">{authorJSX}</div>
      <div id="trans-illust">{transIllJSX}</div>
      <div id="subtitle">{props.json.subtitle}</div>
    </div>
  );
}

export default TitleInfo;
