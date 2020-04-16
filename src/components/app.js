import React from "react";
import DetailsList from "./details-list";
import CoverGrid from "./cover-grid";
import SiteHeader from "./header";
import TagListFull from "./tag-grid";

const bookData = require("../book-data.json");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.tagOnClick = this.tagOnClick.bind(this);
    this.state = {
      activeTagArr: [],
    };
  }

  tagOnClick(e) {
    console.log(e.target.id);
    let newTagArr = this.state.activeTagArr;
    if (newTagArr.includes(e.target.id)) {
      const index = newTagArr.indexOf(e.target.id);
      newTagArr.splice(index, 1);
    } else {
      newTagArr.push(e.target.id);
    }
    this.setState({
      activeTagArr: newTagArr,
    });
  }

  render() {
    return (
      <React.Fragment>
        <SiteHeader />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-xl-2" style={{ padding: "0px" }}>
              <TagListFull
                json={bookData}
                active={this.state.activeTagArr}
                onClick={this.tagOnClick}
              />
            </div>
            <div className="col-md-9 col-xl-10">
              <CoverGrid json={bookData} active={this.state.activeTagArr} />
            </div>
          </div>
        </div>
        {/* <DetailsList json={bookData} /> */}
      </React.Fragment>
    );
  }
}

export default App;
