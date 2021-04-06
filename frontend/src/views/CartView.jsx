import React from 'react';
import View from './View.jsx';

function CartView() {
  const orderCardStyle = {
    maxWidth: '30rem',
    margin: '0 auto',
  };

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
            <tr>
              <th scope="row">1</th>
              <td><a href="/products/1.html">Босоножки 'MYER'</a></td>
              <td>18 US</td>
              <td>1</td>
              <td>34 000 руб.</td>
              <td>34 000 руб.</td>
              <td><button className="btn btn-outline-danger btn-sm">Удалить</button></td>
            </tr>
            <tr>
              <td colspan="5" className="text-right">Общая стоимость</td>
              <td>34 000 руб.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={orderCardStyle}>
          <form className="card-body">
            <div className="form-group">
              <label for="phone">Телефон</label>
              <input className="form-control" id="phone" placeholder="Ваш телефон" />
            </div>
            <div className="form-group">
              <label for="address">Адрес доставки</label>
              <input className="form-control" id="address" placeholder="Адрес доставки" />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="agreement" />
              <label className="form-check-label" for="agreement">Согласен с правилами доставки</label>
            </div>
            <button type="submit" className="btn btn-outline-secondary">Оформить</button>
          </form>

        </div>
      </section>
    </View >
  );
}

export default CartView;
