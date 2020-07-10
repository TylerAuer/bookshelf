import React from "react";
import DetailsList from "./details-list";
import CoverGrid from "./cover-grid";
import SiteHeader from "./header";
import TagListFull from "./tag-list-full";

let bookJSON = require("../book-data.json");

// Turn JSON into array of book objects
const bookData = Object.values(bookJSON);

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
        <div id="tagsDiv" className="container-fluid">
          <div className="col-md-10 offset-md-1">
            <TagListFull
              json={bookData}
              active={this.state.activeTagArr}
              onClick={this.tagOnClick}
            />
          </div>
        </div>
        <div className="container-fluid">
          <CoverGrid
            json={bookData}
            active={this.state.activeTagArr}
            onClick={this.onClickBookCover}
          />
        </div>
        {/* <DetailsList json={bookData} /> */}
      </React.Fragment>
    );
  }
}

export default App;
