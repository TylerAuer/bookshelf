import React from 'react';
import './Header.css';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header = (props) => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__title-container">
        <Link
          to={{
            pathname: '/covers',
            search: location.search,
          }}
        >
          <img
            className="header__svg"
            src={`/header.svg`}
            alt="Purple Bookshelf"
          />
        </Link>
      </div>
      <nav className="header__nav">
        <NavLink
          className="header__nav-link"
          to={{
            pathname: '/covers',
            search: location.search,
          }}
          activeClassName="header__nav-link--active"
        >
          Covers
        </NavLink>
        <NavLink
          className="header__nav-link"
          to={{
            pathname: '/list',
            search: location.search,
          }}
          activeClassName="header__nav-link--active"
        >
          List
        </NavLink>
        <NavLink
          className="header__nav-link"
          to={{
            pathname: '/about',
            search: location.search,
          }}
          activeClassName="header__nav-link--active"
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
