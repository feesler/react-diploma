import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { categoriesReadRequest } from '../store/categoriesSlice';
import { productsReadRequest, readNext, changeSearchQuery } from '../store/productsSlice';
import Preloader from './Preloader.jsx';
import ProductsList from './ProductsList.jsx';
import CategoriesFilter from './CategoriesFilter.jsx';
import { createOptions } from '../utils';

function CatalogList(props) {
  const {
    search,
    categoryId,
    query,
    onFilterChange,
  } = props;
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const isError = (categories.error || products.error);
  const { loading, loadingNext } = products;
  const isLoading = !isError && (categories.loading || loading || loadingNext);
  const contentAvailable = (!!categories.items && !!products.items);

  useEffect(() => {
    if (!categories.items) {
      dispatch(categoriesReadRequest());
    }

    const options = createOptions({ categoryId, q: query });
    dispatch(productsReadRequest(options));
  }, [dispatch, categoryId, query]);

  const handleCategorySelect = (id) => {
    const options = createOptions({
      ...products.form,
      categoryId: id,
    });

    if (onFilterChange) {
      onFilterChange(options);
    }

    dispatch(productsReadRequest(options));
  };

  const handleRetry = () => {
    if (!categories.items) {
      dispatch(categoriesReadRequest());
    }

    if (!products.items) {
      const options = createOptions(products.form);
      dispatch(productsReadRequest(options));
    }
  };

  const handleLoadMore = () => {
    dispatch(readNext());
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (onFilterChange) {
      const options = createOptions(products.form);
      onFilterChange(options);
    }
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
            <input className="form-control" placeholder="Поиск" value={products.form.q} onChange={handleChange} />
          </form>
        )
      }

      { categories.items
        && (
          <CategoriesFilter
            items={categories.items}
            active={products.options.categoryId}
            searchQuery={query}
            onSelect={handleCategorySelect}
          />
        )
      }

      { contentAvailable && !loading
        && <ProductsList items={products.items} />
      }

      { !contentAvailable && !isLoading && !loadingNext
        && (
          <div className="text-center">
            <button className="btn btn-outline-primary" onClick={handleRetry}>Повторить</button>
          </div>
        )
      }

      { contentAvailable && products.moreAvailable && !isLoading && !loadingNext
        && (
          <div className="text-center">
            <button className="btn btn-outline-primary" onClick={handleLoadMore}>Загрузить ещё</button>
          </div>
        )
      }

      { isLoading && <Preloader />}

      { isError && (
        <div className="text-center error-message">Произошла ошибка. Проверьте соединение и попробуйте повторить позднее.</div>
      )}
    </section>
  );
}

CatalogList.propTypes = {
  search: PropTypes.bool,
  query: PropTypes.string,
  onFilterChange: PropTypes.func,
};

CatalogList.defaultProps = {
  search: false,
  query: '',
  onFilterChange: null,
};

export default CatalogList;
