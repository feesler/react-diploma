import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { topSalesReadRequest } from '../store/topSalesSlice';
import Preloader from './Preloader.jsx';
import ProductsList from './ProductsList.jsx';

function TopSales() {
  const { items, loading, error } = useSelector((state) => state.topSales);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(topSalesReadRequest());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(topSalesReadRequest());
  };

  if (!loading && !items.length && !error) {
    return null;
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {!loading && !error && <ProductsList items={items} />}
      {loading && <Preloader />}
      {error && <div className="text-center error-message">Произошла ошибка. Проверьте соединение и попробуйте повторить позднее.</div>}
      { error
        && (
          <div className="text-center">
            <button className="btn btn-outline-primary" onClick={handleRetry}>Повторить</button>
          </div>
        )
      }
    </section>
  );
}

export default TopSales;
