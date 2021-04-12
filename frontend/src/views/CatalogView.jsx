import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import View from './View.jsx';
import CatalogList from '../components/CatalogList.jsx';
import { changeSearchQuery } from '../store/productsSlice';

function CatalogView() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const categoryId = params.get('categoryId');
  const query = params.get('q') ?? '';

  useEffect(() => {
    dispatch(changeSearchQuery(query));
  }, [dispatch, query]);

  return (
    <View>
      <CatalogList search={true} categoryId={categoryId} query={query} />
    </View>
  );
}

CatalogView.propTypes = {
};

export default CatalogView;
