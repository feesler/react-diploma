import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImageLoader from './ImageLoader.jsx';

// TODO: format price
function CatalogItem(props) {
  const {
    id,
    title,
    price,
    images,
  } = props;

  return (
    <div className="card catalog-item-card">
      <div className="card-img-top catalog-item-img">
        <ImageLoader id={id} title={title} images={images} />
      </div>
      <div className="card-body catalog-item-card__body">
        <p className="card-text">{title}</p>
        <p className="card-text">{price} руб.</p>
        <Link className="btn btn-outline-primary to-cart-btn" to={`/products/${id}.html`}>Заказать</Link>
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
