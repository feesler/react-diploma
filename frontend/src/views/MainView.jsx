import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { topSalesReadRequest } from '../store/topSalesSlice';
import View from './View.jsx';
import Preloader from '../components/Preloader.jsx';
import CatalogItem from '../components/CatalogItem.jsx';

function MainView() {
  const { items, loading } = useSelector((state) => state.topSales);
  const dispatch = useDispatch();

  console.log('items: ', items);

  useEffect(() => {
    dispatch(topSalesReadRequest());
  }, []);

  return (
    <View>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {loading && <Preloader />}
        <div className="row">
          {items.map((item) => (
            <div key={item.id} className="col-4">
              <CatalogItem {...item} />
            </div>
          ))}
        </div>
      </section>

      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Preloader />
      </section>

    </View>
  );
}

export default MainView;
