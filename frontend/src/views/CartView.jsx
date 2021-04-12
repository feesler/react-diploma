import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import View from './View.jsx';
import { removeByIndex } from '../store/cartSlice';

function CartView() {
  const {
    items,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const orderCardStyle = {
    maxWidth: '30rem',
    margin: '0 auto',
  };

  const handleDelete = (index) => {
    dispatch(removeByIndex(index));
  };

  const totalPrice = items.reduce((prev, item) => prev + (item.price * item.quantity), 0);

  return (
    <View>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td><a href={`/products/${item.id}.html`}>{item.title}</a></td>
                <td>{item.size}</td>
                <td>{item.quantity}</td>
                <td>{item.price} руб.</td>
                <td>{item.price * item.quantity} руб.</td>
                <td><button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(index)}>Удалить</button></td>
              </tr>
            ))}

            <tr>
              <td colSpan="5" className="text-right">Общая стоимость</td>
              <td>{totalPrice} руб.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={orderCardStyle}>
          <form className="card-body">
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input className="form-control" id="phone" placeholder="Ваш телефон" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input className="form-control" id="address" placeholder="Адрес доставки" />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="agreement" />
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            <button type="submit" className="btn btn-outline-secondary">Оформить</button>
          </form>

        </div>
      </section>
    </View >
  );
}

export default CartView;
