import React from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className="header">
      <div className="header__title-container">
        <Link to="/">
          <h1 className="header__title">Tyler's Bookshelf</h1>
        </Link>
        <p className="header__subtitle">
          Reading recommendations for book lovers
        </p>
      </div>
      <nav className="header__nav">
        <NavLink
          className="header__nav-link"
          to="/books/covers"
          activeClassName="header__nav-link--active"
        >
          Covers
        </NavLink>
        <NavLink
          className="header__nav-link"
          to="/books/list"
          activeClassName="header__nav-link--active"
        >
          List
        </NavLink>
        <NavLink
          className="header__nav-link"
          to="/about"
          activeClassName="header__nav-link--active"
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
