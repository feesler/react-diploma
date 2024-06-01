import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { createSearchParams } from '../utils/index.js';

const noFilterItem = {
  id: null,
  title: 'Все',
};

function CategoriesFilter(props) {
  const {
    items,
    active,
    searchQuery,
    onSelect,
  } = props;
  const categories = [noFilterItem, ...items];
  const urlParams = { q: searchQuery };

  const handleClick = (e) => {
    e.preventDefault();

    const id = Number(e.target.dataset.id) ?? null;
    onSelect(id);
  };

  if (!items.length) {
    return null;
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      { categories.map((item) => {
        const params = createSearchParams({ ...urlParams, categoryId: item.id });

        return (
          <li key={`cat_${item.id}`} className="nav-item">
            <Link
              className={classNames('nav-link', { active: item.id === active })}
              to={`/catalog.html?${params}`}
              data-id={item.id}
              onClick={handleClick}
            >{item.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

CategoriesFilter.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
  active: PropTypes.number,
  searchQuery: PropTypes.string,
};

CategoriesFilter.defaultProps = {
  active: null,
  searchQuery: '',
};

export default CategoriesFilter;
