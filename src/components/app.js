import React from "react";
import DetailsList from "./details-list";
import CoverGrid from "./cover-grid";
import SiteHeader from "./header";
import TagListFull from "./tag-grid";

function App(props) {
  const bookData = require("../book-data.json");

  return (
    <React.Fragment>
      <SiteHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-xl-2" style={{ padding: "0px" }}>
            <TagListFull json={bookData} />
          </div>
          <div className="col-md-9 col-xl-10">
            <CoverGrid json={bookData} />
          </div>
        </div>
      </div>
      <DetailsList json={bookData} />
    </React.Fragment>
  );
}

export default App;
