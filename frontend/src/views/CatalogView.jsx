import React from 'react';
import { useLocation } from 'react-router-dom';
import View from './View.jsx';
import CatalogList from '../components/CatalogList.jsx';

function CatalogView() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const categoryId = params.get('categoryId');
  const query = params.get('q');

  return (
    <View>
      <CatalogList search={true} categoryId={categoryId} query={query} />
    </View>
  );
}

CatalogView.propTypes = {
};

export default CatalogView;
