import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import DetailsList from "./components/details-list";
import CoverGrid from "./components/cover-grid";
import SiteHeader from "./components/header";

const bookData = require("./book-data.json");

ReactDOM.render(
  <React.StrictMode>
    <SiteHeader />
    <CoverGrid json={bookData} />
    {/* <DetailsList json={bookData} /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
