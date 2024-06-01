import classNames from 'classnames';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeOrderField, invalidateField, orderRequest } from '../store/cartSlice.js';
import Preloader from './Preloader.jsx';

const orderCardStyle = {
  maxWidth: '30rem',
  margin: '0 auto',
};

function OrderForm() {
  const {
    items,
    owner,
    validation,
    loading,
    error,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const field = { name: e.target.id };

    if (e.target.type === 'checkbox') {
      field.value = e.target.checked;
    } else {
      field.value = e.target.value;
    }

    dispatch(changeOrderField(field));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!owner.phone.length) {
      dispatch(invalidateField({ name: 'phone' }));
      return;
    }

    if (!owner.address.length) {
      dispatch(invalidateField({ name: 'address' }));
      return;
    }

    const order = {
      owner: { phone: owner.phone, address: owner.address },
      items: items.map((item) => ({ id: item.id, price: item.price, count: item.quantity })),
    };

    dispatch(orderRequest({ order, navigate }));
  };

  if (!items.length) {
    return null;
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={orderCardStyle}>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className={classNames('form-control', { 'is-invalid': !validation.phone })}
              id="phone"
              disabled={loading}
              placeholder="Ваш телефон"
              value={owner.phone}
              onChange={handleChange}
            />
            <div className="invalid-feedback">Необходимо заполнить это поле</div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className={classNames('form-control', { 'is-invalid': !validation.address })}
              id="address"
              disabled={loading}
              placeholder="Адрес доставки"
              value={owner.address}
              onChange={handleChange}
            />
            <div className="invalid-feedback">Необходимо заполнить это поле</div>
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              disabled={loading}
              onChange={handleChange}
              checked={owner.agreement}
            />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            disabled={!owner.agreement || loading}
          >Оформить</button>
          {error && <div className="error-message">Произошла ошибка. Попробуйте повторить позднее.</div>}
        </form>
        {loading
          && <div className="dimmer"><Preloader /></div>
        }
      </div>
    </section>
  );
}

export default OrderForm;
