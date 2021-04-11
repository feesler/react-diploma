import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { topSalesReadRequest } from '../store/topSalesSlice';
import Preloader from './Preloader.jsx';
import ProductsList from './ProductsList.jsx';

function TopSales() {
  const topSales = useSelector((state) => state.topSales);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(topSalesReadRequest());
  }, [dispatch]);

  if (!topSales.loading && !topSales.items) {
    return null;
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {topSales.loading && <Preloader />}
      {!topSales.loading && <ProductsList items={topSales.items} />}
    </section>
  );
}

export default TopSales;
