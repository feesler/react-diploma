import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import headerLogo from '../assets/img/header-logo.png';
import SearchWidget from './SearchWidget.jsx';
import CartWidget from './CartWidget.jsx';

function Header() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavBar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <header className="container">
      <div className="row">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src={headerLogo} alt="Bosa Noga" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              aria-controls="navbarMain"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={toggleNavBar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              id="navbarMain"
              className={classNames('collapse navbar-collapse', { show: !collapsed })}
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" exact activeClassName="active">Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/catalog.html" activeClassName="active">Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about.html" activeClassName="active">О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contacts.html" activeClassName="active">Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <SearchWidget />
                  <CartWidget />
                </div>
              </div>
            </div>
          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;
