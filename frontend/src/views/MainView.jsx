import React from 'react';
import View from './View.jsx';
import CatalogList from '../components/CatalogList.jsx';
import TopSales from '../components/TopSales.jsx';

function MainView() {
  return (
    <View>
      <TopSales />
      <CatalogList />
    </View>
  );
}

export default MainView;
