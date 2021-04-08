import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const noFilterItem = {
  id: null,
  title: 'Все',
};

function CategoriesFilter(props) {
  const { items, active, onSelect } = props;
  const categories = [noFilterItem, ...items];

  const handleClick = (e) => {
    e.preventDefault();

    const id = Number(e.target.dataset.id) ?? null;
    onSelect(id);
  };

  return (
    <ul className="catalog-categories nav justify-content-center">
      { categories.map((item) => (
        <li key={`cat_${item.id}`} className="nav-item">
          <Link
            className={classNames('nav-link', { active: item.id === active })}
            to={`catalog.html?categoryId=${item.id}`}
            data-id={item.id}
            onClick={handleClick}
          >{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}

CategoriesFilter.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  active: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

CategoriesFilter.defaultProps = {
  active: null,
};

export default CategoriesFilter;
