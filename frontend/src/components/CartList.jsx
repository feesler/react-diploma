import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeByIndex } from '../store/cartSlice.js';

function CartList() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleDelete = (index) => {
    dispatch(removeByIndex(index));
  };

  const totalPrice = items.reduce((prev, item) => prev + (item.price * item.quantity), 0);

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      { (items.length > 0)
        ? (
          <div className="table-responsive">
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
          </div>
        )
        : (
          <h6 className="text-center">Ваша корзина пуста</h6>
        )
      }
    </section>
  );
}

export default CartList;
