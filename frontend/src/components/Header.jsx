import React from 'react';
import { NavLink } from 'react-router-dom';
import headerLogo from '../assets/img/header-logo.png';
import SearchWidget from './SearchWidget.jsx';
import CartWidget from './CartWidget.jsx';

function Header() {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img src={headerLogo} alt="Bosa Noga" />
            </a>

            <div className="collapase navbar-collapse" id="navbarMain">
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
