import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { categoriesReadRequest } from '../store/categoriesSlice';
import { productsReadRequest, readNext, changeSearchQuery } from '../store/productsSlice';
import Preloader from './Preloader.jsx';
import ProductsList from './ProductsList.jsx';
import CategoriesFilter from './CategoriesFilter.jsx';

function CatalogList(props) {
  const { search, categoryId, query } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const isLoading = (categories.loading || products.loading);

  console.log('[CatalogList] isLoading: ', isLoading);
  console.log('[CatalogList] products: ', products);
  console.log('[CatalogList] query: ', query, ' products.searchQuery: ', products.searchQuery);

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

  const handleCategorySelect = (id) => {
    const options = {};
    const searchParams = new URLSearchParams();
    if (id) {
      options.categoryId = id;
      searchParams.set('categoryId', id);
    }
    if (query) {
      searchParams.set('q', query);
      options.q = query;
    }

    if (search) {
      history.push(`catalog.html?${searchParams}`);
    }

    dispatch(productsReadRequest(options));
  };

  const handleLoadMore = () => {
    dispatch(readNext());
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();
    if (categoryId) {
      searchParams.set('categoryId', categoryId);
    }
    if (products.searchQuery) {
      searchParams.set('q', products.searchQuery);
    }

    history.push(`catalog.html?${searchParams}`);
  };

  const handleChange = (e) => {
    dispatch(changeSearchQuery(e.target.value));
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      { search
        && (
          <form className="catalog-search-form form-inline" onSubmit={handleSearch}>
            <input className="form-control" placeholder="Поиск" value={products.searchQuery} onChange={handleChange} />
          </form>
        )
      }

      { (categories.items.length > 0)
        && (
          <CategoriesFilter
            items={categories.items}
            active={products.options.categoryId}
            searchQuery={query}
            onSelect={handleCategorySelect}
          />
        )
      }

      { (products.items.length > 0 || !isLoading)
        && <ProductsList items={products.items} />
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
