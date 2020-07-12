import React from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className="header">
      <div className="header__title-container">
        <Link to="/">
          <img
            className="header__svg"
            src={`/header.svg`}
            alt="Purple Bookshelf"
          />
        </Link>
        {/* <div className="header__subtitle">
          Reading recommendations for book lovers
        </div> */}
      </div>
      <nav className="header__nav">
        <NavLink
          className="header__nav-link"
          to="/covers"
          activeClassName="header__nav-link--active"
        >
          Covers
        </NavLink>
        <NavLink
          className="header__nav-link"
          to="/list"
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
