import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import View from './View.jsx';
import CatalogList from '../components/CatalogList.jsx';
import TopSales from '../components/TopSales.jsx';
import { productsReadRequest, changeCategoryId, changeSearchQuery } from '../store/productsSlice';

function MainView() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('[MainView] useEffect');

    dispatch(changeCategoryId(null));
    dispatch(changeSearchQuery(null));
    dispatch(productsReadRequest({ categoryId: null, q: '' }));
  }, [dispatch]);

  return (
    <View>
      <TopSales />
      <CatalogList />
    </View>
  );
}

export default MainView;
