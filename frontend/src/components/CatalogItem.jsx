import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// TODO: format price
function CatalogItem(props) {
  const {
    id,
    images,
    title,
    price,
  } = props;
  const image = images ? images[0] : null;

  return (
    <div className="card catalog-item-card">
      <img className="card-img-top img-fluid" src={image} alt={title} />
      <div className="card-body">
        <p className="card-text">{title}</p>
        <p className="card-text">{price} руб.</p>
        <Link className="btn btn-outline-primary" to={`/products/${id}.html`}>Заказать</Link>
      </div>
    </div>
  );
}

CatalogItem.propTypes = {
  images: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default CatalogItem;
