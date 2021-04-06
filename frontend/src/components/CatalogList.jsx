import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoriesReadRequest } from '../store/categoriesSlice';
import { productsReadRequest } from '../store/productsSlice';
import Preloader from './Preloader.jsx';
import CatalogItem from './CatalogItem.jsx';

function CatalogList(props) {
  const { search } = props;
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const isLoading = (categories.loading || products.loading);

  useEffect(() => {
    dispatch(categoriesReadRequest());
    dispatch(productsReadRequest());
  }, [dispatch]);

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      { isLoading && <Preloader />}

      { (!isLoading && search)
        && <form className="catalog-search-form form-inline">
          <input className="form-control" placeholder="Поиск" />
        </form>
      }

      { !isLoading
        && (
          <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item">
              <a className="nav-link active" href="#">Все</a>
            </li>
            { categories.items.map((item) => (
              <li key={`cat_${item.id}`} className="nav-item">
                <Link className="nav-link" to={`/catalog.html?categoryId=${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        )
      }

      <div className="row">
        {products.items.map((item) => (
          <div key={item.id} className="col-4">
            <CatalogItem {...item} />
          </div>
        ))}
      </div>
    </section>
  );
}

CatalogList.propTypes = {
  search: PropTypes.bool,
};

CatalogList.defaultProps = {
  search: false,
};

export default CatalogList;
