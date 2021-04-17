import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import View from './View.jsx';
import CatalogList from '../components/CatalogList.jsx';
import TopSales from '../components/TopSales.jsx';
import { productsReadRequest, changeCategoryId, changeSearchQuery } from '../store/productsSlice';

function MainView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCategoryId(null));
    dispatch(changeSearchQuery(''));
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
