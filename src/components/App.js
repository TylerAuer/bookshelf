import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import About from './About';

const App = (props) => {
  return (
    <>
      <HashRouter>
        <Header />
        <Switch>
          <Route path="/single/:id" />
          <Route path="/about" component={About} />
          <Route path="/books/list" />
          <Route path="/books/covers" />
          <Route path="/">
            <Redirect to="/books/covers" />
          </Route>
        </Switch>
      </HashRouter>
    </>
  );
};

export default App;
