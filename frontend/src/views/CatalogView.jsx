import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import View from './View.jsx';
import CatalogList from '../components/CatalogList.jsx';
import { productsReadRequest } from '../store/productsSlice';
import { createSearchParams } from '../utils';

function CatalogView() {
  const dispatch = useDispatch();
  const { sending } = useSelector((state) => state.products);
  const history = useHistory();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const categoryId = params.get('categoryId') ? Number(params.get('categoryId')) : null;
  const query = params.get('q') ?? '';

  console.log('[CatalogView] categoryId: ', categoryId, ' query: ', query);

  useEffect(() => {
    if (sending.q !== query || sending.categoryId !== categoryId) {
      dispatch(productsReadRequest({ categoryId, query }));
    }
  }, [dispatch, query, categoryId, sending.q, sending.categoryId]);

  const handleFilterChange = (options) => {
    const searchParams = createSearchParams(options);
    history.push(`catalog.html?${searchParams}`);
  };

  return (
    <View>
      <CatalogList
        search={true}
        categoryId={categoryId}
        query={query}
        onFilterChange={handleFilterChange}
      />
    </View>
  );
}

CatalogView.propTypes = {
};

export default CatalogView;
