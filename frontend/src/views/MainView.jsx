import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { topSalesReadRequest } from '../store/topSalesSlice';
import View from './View.jsx';
import Preloader from '../components/Preloader.jsx';
import CatalogItem from '../components/CatalogItem.jsx';
import CatalogList from '../components/CatalogList.jsx';

function MainView() {
  const topSales = useSelector((state) => state.topSales);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(topSalesReadRequest());
  }, [dispatch]);

  return (
    <View>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {topSales.loading && <Preloader />}
        <div className="row">
          {topSales.items.map((item) => (
            <div key={item.id} className="col-4 catalog-item-container">
              <CatalogItem {...item} />
            </div>
          ))}
        </div>
      </section>

      <CatalogList />
    </View>
  );
}

export default MainView;
