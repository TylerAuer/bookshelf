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

const App = (props) => {
  // State for order of books as list of IDs
  const [bookIDOrder, setBookIDOrder] = useState(
    shuffleList(Object.keys(books))
  );
  // State for filtered books as list of IDs
  const filteredBookIDs = useFilteredBookIDs();

  // Shuffles order the books appear. Passed to filters
  const shuffleBookOrder = () => {
    setBookIDOrder(shuffleList(Object.keys(books)));
  };

  // List of book data in current order that fit the active filters
  // to pass down to components
  /* 
  TODO: Can get rid of this if I pass down activeBookIDs and books to 
  Covers and List. They can then just look up the info they need.
  */
  const activeBooks = [];
  bookIDOrder.forEach((bookID) => {
    if (filteredBookIDs.includes(bookID)) {
      activeBooks.push(books[bookID]);
    }
  });

  // List of book IDs in current order that fit the active filters
  // to pass to single for Next and Previous BTNs
  const activeBookIDs = [];
  bookIDOrder.forEach((bookID) => {
    if (filteredBookIDs.includes(bookID)) {
      activeBookIDs.push(bookID);
    }
  });

  return (
    <>
      <Header />
      <Filters books={books} shuffleBookOrder={shuffleBookOrder} />
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
            return <Covers {...props} activeBooks={activeBooks} />;
          }}
        />
        <Route
          path="/list"
          render={(props) => {
            return <List {...props} activeBooks={activeBooks} />;
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
