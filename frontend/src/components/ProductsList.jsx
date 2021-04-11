import React from 'react';
import PropTypes from 'prop-types';
import CatalogItem from './CatalogItem.jsx';

function ProductsList(props) {
  const { items } = props;

  return (
    <div className="row">
      {(items.length > 0)
        ? items.map((item) => (
          <div key={`prod_${item.id}`} className="col-4 catalog-item-container">
            <CatalogItem {...item} />
          </div>
        ))
        : <div className="container text-center">Не найдены товары удовлетвоящие запросу</div>
      }
    </div>
  );
}

ProductsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
  })).isRequired,
};

export default ProductsList;
