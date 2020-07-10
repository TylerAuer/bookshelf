import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

const App = (props) => {
  return (
    <>
      <header>This is the header</header>
      <HashRouter>
        <Switch>
          <Route path="/single/:id" />
          <Route path="/about/" />
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
