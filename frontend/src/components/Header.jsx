import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import headerLogo from '../assets/img/header-logo.png';

function Header() {
  const history = useHistory();

  const handleCartClick = () => {
    history.push('/cart.html');
  };

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
                  <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                  {/* Do programmatic navigation on click to /cart.html */}
                  <div className="header-controls-pic header-controls-cart" onClick={handleCartClick}>
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                  <input className="form-control" placeholder="Поиск" />
                </form>
              </div>
            </div>
          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;
