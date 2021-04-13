import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import View from './View.jsx';

import OrderForm from '../components/OrderForm.jsx';
import CartList from '../components/CartList.jsx';

function CartView() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const submitResult = params.get('submit');

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
      <CartList />
      <OrderForm />
    </View >
  );
}

export default CartView;
