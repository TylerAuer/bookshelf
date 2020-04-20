import React from "react";
import DetailsList from "./details-list";
import CoverGrid from "./cover-grid";
import SiteHeader from "./header";
import TagListFull from "./tag-grid";

let bookData = require("../book-data.json");
// Fisher-Yates shuffle algorithm (shuffles array in place)
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// shuffles books so new titles appear on each visit
shuffle(bookData);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.tagOnClick = this.tagOnClick.bind(this);
    this.state = {
      activeTagArr: [],
    };
  }

  tagOnClick(e) {
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
              <CoverGrid
                json={bookData}
                active={this.state.activeTagArr}
                onClick={this.onClickBookCover}
              />
            </div>
          </div>
        </div>
        {/* <DetailsList json={bookData} /> */}
      </React.Fragment>
    );
  }
}

export default App;
