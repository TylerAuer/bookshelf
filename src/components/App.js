import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Filters from './Filters';
import About from './About';
import Single from './Single';
import Covers from './Covers';
import List from './List';
import data from '../data.json';
import useActiveBooks from '../hooks/useActiveBooks';

// Randomize the order of the books
// Pass the active query string object components
// Query String Should be Parsed here asnd passed to Filters, Covers, List and Single

const App = (props) => {
  const activeBooks = useActiveBooks();

  return (
    <>
      <Header />
      <Filters books={data.books} />
      <Switch>
        <Route
          path="/single/:id"
          render={(props) => {
            return <Single {...props} books={activeBooks} />;
          }}
        />
        <Route path="/about" component={About} />
        <Route
          path="/covers"
          render={(props) => {
            return <Covers {...props} books={activeBooks} />;
          }}
        />
        <Route
          path="/list"
          render={(props) => {
            return <List {...props} books={activeBooks} />;
          }}
        />
        <Route path="/">
          <Redirect to="/covers" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
