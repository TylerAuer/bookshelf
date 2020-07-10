import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';

const App = (props) => {
  return (
    <>
      <HashRouter>
        <Header />
        <Switch>
          <Route path="/single/:id" />
          <Route path="/about" />
          <Route path="/books/list" />
          <Route path="/books/covers" />
          <Route path="/">
            <Redirect to="/books/covers" />
          </Route>
        </Switch>
      </HashRouter>
      <footer>This is the footer</footer>
    </>
  );
};

export default App;
