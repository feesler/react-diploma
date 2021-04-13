import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import View from './View.jsx';
import { removeByIndex } from '../store/cartSlice';
import OrderForm from '../components/OrderForm.jsx';

function CartView() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const submitResult = params.get('submit');
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleDelete = (index) => {
    dispatch(removeByIndex(index));
  };

  const totalPrice = items.reduce((prev, item) => prev + (item.price * item.quantity), 0);

  if (submitResult === 'ok') {
    return (
      <View>
        <div className="order-success-message">
          <h3>Ваш заказ отправлен в обработку</h3>
          <h6>Менеджер свяжется с вами для уточнения деталей.</h6>
          <Link to="/catalog.html">Продолжить покупки</Link>
        </div>
      </View>
    );
  }

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
              <tr key={`cart_${index}`}>
                <th scope="row">{index + 1}</th>
                <td><Link to={`products/${item.id}.html`}>{item.title}</Link></td>
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

      <OrderForm />
    </View >
  );
}

export default CartView;
