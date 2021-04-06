import React from 'react';
import View from './View.jsx';
import CatalogItem from '../components/CatalogItem.jsx';

function CatalogView() {
  return (
    <View>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>

        <form className="catalog-search-form form-inline">
          <input className="form-control" placeholder="Поиск" />
        </form>

        <ul className="catalog-categories nav justify-content-center">
          <li className="nav-item">
            <a className="nav-link active" href="#">Все</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Женская обувь</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Мужская обувь</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Обувь унисекс</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Детская обувь</a>
          </li>
        </ul>

        <div className="row">
          <div className="col-4">
            <CatalogItem
              image="https://cdn-images.farfetch-contents.com/12/93/06/52/12930652_13567910_1000.jpg"
              title="Босоножки 'MYER'"
              price="34000"
            />
          </div>
          <div className="col-4">
            <CatalogItem
              image="https://cdn-images.farfetch-contents.com/12/94/66/72/12946672_13518465_1000.jpg"
              title="Босоножки 'Keira'"
              price="7600"
            />
          </div>
          <div className="col-4">
            <CatalogItem
              image="https://cdn-images.farfetch-contents.com/12/99/04/32/12990432_13705715_1000.jpg"
              title="Супергеройские кеды"
              price="1400"
            />
          </div>
          <div className="col-4">
            <CatalogItem
              image="https://cdn-images.farfetch-contents.com/12/93/06/52/12930652_13567910_1000.jpg"
              title="Босоножки 'MYER'"
              price="34000"
            />
          </div>
          <div className="col-4">
            <CatalogItem
              image="https://cdn-images.farfetch-contents.com/12/94/66/72/12946672_13518465_1000.jpg"
              title="Босоножки 'Keira'"
              price="7600"
            />
          </div>
          <div className="col-4">
            <CatalogItem
              image="https://cdn-images.farfetch-contents.com/12/99/04/32/12990432_13705715_1000.jpg"
              title="Супергеройские кеды"
              price="1400"
            />
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-outline-primary">Загрузить ещё</button>
        </div>
      </section>
    </View>
  );
}

CatalogView.propTypes = {
};

export default CatalogView;
