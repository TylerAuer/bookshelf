import React, { useState } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import About from './About';
import Single from './Single';
import Covers from './Covers';
import data from '../data.json';

const App = (props) => {
  const [books, setBooks] = useState(data.books);
  return (
    <>
      <HashRouter>
        <Header />
        <Switch>
          <Route
            path="/single/:id"
            render={(props) => {
              return <Single {...props} books={books} />;
            }}
          />
          <Route
            path="/books/covers"
            render={(props) => {
              return <Covers {...props} books={books} />;
            }}
          />
          <Route path="/about" component={About} />
          <Route path="/books/list" />
          <Route path="/">
            <Redirect to="/books/covers" />
          </Route>
        </Switch>
      </HashRouter>
    </>
  );
};

export default App;
