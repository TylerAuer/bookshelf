import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import useFilteredBookIDs from '../hooks/useFilteredBookIDs';
import books from '../books.json';
import shuffleList from '../functions/shuffleList';
import Header from './Header';
import Filters from './Filters';
import About from './About';
import Single from './Single';
import Covers from './Covers';
import List from './List';

const App = () => {
  // State for order of books as list of IDs
  // Must be separated out so that it doesn't change when the filters change
  const [bookIDOrder, setBookIDOrder] = useState(
    shuffleList(Object.keys(books))
  );
  // State for filtered books as list of ID
  const { filteredBookIDs, yearMap, tagMap } = useFilteredBookIDs();

  // List of book IDs in current order that fit the active filters
  // to pass to single for Next and Previous BTNs
  const activeBookIDs = [];
  bookIDOrder.forEach((bookID) => {
    if (filteredBookIDs.includes(bookID)) {
      activeBookIDs.push(bookID);
    }
  });

  // Triggers a shuffle of the book IDs. Passed to filters
  const shuffleBookOrder = () => {
    setBookIDOrder(shuffleList(Object.keys(books)));
  };

  return (
    <>
      <Header />
      <Filters
        yearMap={yearMap}
        tagMap={tagMap}
        shuffleBookOrder={shuffleBookOrder}
      />
      <Switch>
        <Route
          path="/single/:id"
          render={(props) => {
            return (
              <Single {...props} books={books} activeBookIDs={activeBookIDs} />
            );
          }}
        />
        <Route
          path="/about"
          render={(props) => {
            return <About {...props} books={books} />;
          }}
        />
        <Route
          path="/covers"
          render={(props) => {
            return <Covers {...props} activeBookIDs={activeBookIDs} />;
          }}
        />
        <Route
          path="/list"
          render={(props) => {
            return <List {...props} activeBookIDs={activeBookIDs} />;
          }}
        />
        ?
        <Route path="/">
          <Redirect to="/covers" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
