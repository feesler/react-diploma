import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeOrderField, orderRequest } from '../store/cartSlice';

const orderCardStyle = {
  maxWidth: '30rem',
  margin: '0 auto',
};

function OrderForm() {
  const { items, owner } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const field = { name: e.target.id };

    if (e.target.type === 'checkbox') {
      field.value = e.target.checked;
    } else {
      field.value = e.target.value;
    }

    dispatch(changeOrderField(field));
  };

  const handleSubmit = () => {
    const data = {
      owner: { phone: owner.phone, address: owner.address },
      items: items.map((item) => ({ id: item.id, price: item.price, count: item.quantity })),
    };

    dispatch(orderRequest(data));
  };

  return (
    <div className="card" style={orderCardStyle}>
      <form className="card-body">
        <div className="form-group">
          <label htmlFor="phone">Телефон</label>
          <input
            className="form-control"
            id="phone"
            placeholder="Ваш телефон"
            value={owner.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Адрес доставки</label>
          <input
            className="form-control"
            id="address"
            placeholder="Адрес доставки"
            value={owner.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreement"
            onChange={handleChange}
            checked={owner.agreement}
          />
          <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
        </div>
        <button
          type="submit"
          className="btn btn-outline-secondary"
          disabled={!owner.agreement}
          onClick={handleSubmit}
        >Оформить</button>
      </form>
    </div>
  );
}

export default OrderForm;
