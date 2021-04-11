import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { getProductImage, validateImage } from '../store/imagesSlice';

// TODO: format price
function CatalogItem(props) {
  const {
    id,
    title,
    price,
    images,
  } = props;
  const validImage = useSelector(getProductImage(id));
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const image = validImage ?? images[index];

  const handleLoad = () => {
    dispatch(validateImage({ id, url: image }));
  };

  const handleError = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div className="card catalog-item-card">
      <div className={classNames('card-img-top', 'catalog-item-img', { 'catalog-item-img_loading': !validImage })}>
        <div className={classNames(
          'card-img__placeholder',
          { 'card-img__placeholder-1': (id % 2) },
          { 'card-img__placeholder-2': !(id % 2) },
        )}
        >Нет изображения</div>
        <img className="img-fluid" src={image} alt={title} onLoad={handleLoad} onError={handleError} />
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
