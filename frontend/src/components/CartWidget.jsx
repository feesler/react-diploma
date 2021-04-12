import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CartWidget() {
  const history = useHistory();
  const { items } = useSelector((state) => state.cart);

  const handleClick = () => {
    history.push('/cart.html');
  };

  return (
    <div className="header-controls-pic header-controls-cart" onClick={handleClick}>
      { (items.length > 0)
        && <div className="header-controls-cart-full">{items.length}</div>
      }
      <div className="header-controls-cart-menu"></div>
    </div>
  );
}

export default CartWidget;
