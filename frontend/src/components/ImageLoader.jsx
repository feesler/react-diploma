import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getProductImage, validateImage } from '../store/imagesSlice.js';

function ImageLoader(props) {
  const { id, title, images } = props;
  const validImage = useSelector(getProductImage(id));
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const image = validImage ?? (images) ? images[index] : null;

  const handleLoad = () => {
    dispatch(validateImage({ id, url: image }));
  };

  const handleError = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div className={classNames('img-loader', { 'img-loader_loading': !validImage })}>
      <div className={classNames(
        'img-loader__placeholder',
        { 'img-loader__placeholder-1': (id % 2) },
        { 'img-loader__placeholder-2': !(id % 2) },
      )}
      >Нет изображения</div>
      <img className="img-fluid" src={image} alt={title} onLoad={handleLoad} onError={handleError} />
    </div>
  );
}

ImageLoader.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageLoader;
