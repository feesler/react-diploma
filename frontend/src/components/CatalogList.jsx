import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { categoriesReadRequest } from '../store/categoriesSlice';
import { productsReadRequest } from '../store/productsSlice';
import Preloader from './Preloader.jsx';
import CatalogItem from './CatalogItem.jsx';

function CatalogList(props) {
  const { search, categoryId, query } = props;
  const [q, setQuery] = useState(query);
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const isLoading = (categories.loading || products.loading);

  console.log('[CatalogList] isLoading: ', isLoading);
  console.log('[CatalogList] products: ', products);

  useEffect(() => {
    dispatch(categoriesReadRequest());

    const options = {};
    if (categoryId) {
      options.categoryId = categoryId;
    }
    if (query) {
      options.q = query;
    }
    dispatch(productsReadRequest(options));
  }, [dispatch, categoryId, query]);

  const handleCategorySelect = (e) => {
    if (!search) {
      e.preventDefault();
    }

    const id = Number(e.target.dataset.id);
    const options = {};
    if (id) {
      options.categoryId = id;
    }
    dispatch(productsReadRequest(options));
  };

  const handleLoadMore = () => {
    dispatch(productsReadRequest({
      ...products.options,
      offset: products.items.length,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();
    if (categoryId) {
      searchParams.set('categoryId', categoryId);
    }
    searchParams.set('q', q);

    history.push(`catalog.html?${searchParams}`);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      { search
        && (
          <form className="catalog-search-form form-inline" onSubmit={handleSearch}>
            <input className="form-control" placeholder="Поиск" value={q} onChange={handleChange} />
          </form>
        )
      }

      { !isLoading
        && (
          <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item">
              <Link
                className={classNames('nav-link', { active: !products.options.categoryId })}
                to="catalog.html"
                onClick={handleCategorySelect}
              >Все</Link>
            </li>
            { categories.items.map((item) => (
              <li key={`cat_${item.id}`} className="nav-item">
                <Link
                  className={classNames('nav-link', { active: products.options.categoryId === item.id })}
                  to={`catalog.html?categoryId=${item.id}`}
                  data-id={item.id}
                  onClick={handleCategorySelect}
                >{item.title}</Link>
              </li>
            ))}
          </ul>
        )
      }

      { !isLoading
        && (
          <div className="row">
            {products.items.map((item) => (
              <div key={item.id} className="col-4">
                <CatalogItem {...item} />
              </div>
            ))}
          </div>
        )
      }

      { products.moreAvailable && !isLoading
        && (
          <div className="text-center">
            <button className="btn btn-outline-primary" onClick={handleLoadMore}>Загрузить ещё</button>
          </div>
        )
      }

      { isLoading && <Preloader />}
    </section>
  );
}

CatalogList.propTypes = {
  search: PropTypes.bool,
  query: PropTypes.string,
};

CatalogList.defaultProps = {
  search: false,
  query: '',
};

export default CatalogList;
