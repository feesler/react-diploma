import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import View from './View.jsx';
import Preloader from '../components/Preloader.jsx';
import { getProductById } from '../store/productsSlice.js';
import {
  detailsReadRequest,
  selectSize,
  setQuantity,
} from '../store/productDetailsSlice.js';
import { addToCart } from '../store/cartSlice.js';
import ImageLoader from '../components/ImageLoader.jsx';

const getAvailSizes = (item) => (
  (item && item.sizes)
    ? item.sizes.filter((sz) => sz.avalible)
    : []
);

function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    item,
    loading,
    error,
    selectedSize,
    quantity,
  } = useSelector((state) => state.details);
  const availSizes = getAvailSizes(item);
  const productItem = useSelector(getProductById(Number(id)));
  const imageItem = productItem ?? item;

  useEffect(() => {
    dispatch(detailsReadRequest(id));
  }, [dispatch, id]);

  const handleRetry = () => {
    dispatch(detailsReadRequest(id));
  };

  const handleSizeClick = (e) => {
    dispatch(selectSize(e.target.dataset.size));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(setQuantity(quantity - 1));
    }
  };

  const handleIncrease = () => {
    if (quantity < 10) {
      dispatch(setQuantity(quantity + 1));
    }
  };

  const handleSubmit = () => {
    const cartItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      size: selectedSize,
      quantity,
    };

    dispatch(addToCart(cartItem));
    navigate('../cart.html');
  };

  return (
    <View>
      <section className="catalog-item">
        <h2 className="text-center">{item && item.title}</h2>
        <div className="row">
          <div className="col-5 catalog-item-image">
            {imageItem && imageItem.id
              && (
                <ImageLoader
                  id={imageItem.id}
                  title={imageItem.title}
                  images={imageItem.images}
                />
              )
            }
          </div>
          <div className="col-7 catalog-item-table">
            {item
              && (
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>Артикул</td>
                      <td>{item.sku}</td>
                    </tr>
                    <tr>
                      <td>Производитель</td>
                      <td>{item.manufacturer}</td>
                    </tr>
                    <tr>
                      <td>Цвет</td>
                      <td>{item.color}</td>
                    </tr>
                    <tr>
                      <td>Материалы</td>
                      <td>{item.material}</td>
                    </tr>
                    <tr>
                      <td>Сезон</td>
                      <td>{item.season}</td>
                    </tr>
                    <tr>
                      <td>Повод</td>
                      <td>{item.reason}</td>
                    </tr>
                  </tbody>
                </table>
              )
            }
            {item && availSizes.length > 0
              && (
                <>
                  <div className="text-center">
                    <p>Размеры в наличии:&nbsp;
                    {availSizes.map(
                      (sz) => (
                        <span
                          key={`size_${sz.size}`}
                          className={classNames('catalog-item-size', { selected: sz.size === selectedSize })}
                          data-size={sz.size}
                          onClick={handleSizeClick}
                        >{sz.size}</span>
                      ),
                    )}
                    </p>
                    <p>Количество: <span className="btn-group btn-group-sm pl-2">
                      <button className="btn btn-secondary" onClick={handleDecrease}>-</button>
                      <span className="btn btn-outline-primary">{quantity}</span>
                      <button className="btn btn-secondary" onClick={handleIncrease}>+</button>
                    </span>
                    </p>
                  </div>
                  <button className="btn btn-danger btn-block btn-lg" disabled={!selectedSize} onClick={handleSubmit}>В корзину</button>
                </>
              )
            }

            {loading && <Preloader />}

            {error
              && (
                <>
                  <div className="text-center error-message">Произошла ошибка. Проверьте соединение и попробуйте повторить позднее.</div>
                  <div className="text-center">
                    <button className="btn btn-outline-primary" onClick={handleRetry}>Повторить</button>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </section>
    </View>
  );
}

export default ProductView;
