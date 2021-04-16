import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import View from './View.jsx';
import CatalogList from '../components/CatalogList.jsx';
import { changeCategoryId, changeSearchQuery, productsReadRequest } from '../store/productsSlice';
import { createSearchParams } from '../utils';

function CatalogView() {
  const dispatch = useDispatch();
  const { sending, current, form } = useSelector((state) => state.products);
  const history = useHistory();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const categoryId = params.get('categoryId') ? Number(params.get('categoryId')) : null;
  const q = params.get('q') ?? '';

  console.log('[CatalogView] location: categoryId: ', categoryId, ' q: ', q, ' (', (typeof q), ')');
  console.log('[CatalogView] form: ', form, ' current: ', current, ' sending: ', sending);

  useEffect(() => {
    console.log('[CatalogView] location changed!');

    if (sending.categoryId !== categoryId) {
      dispatch(changeCategoryId(categoryId));
    }
    if (sending.q !== q) {
      dispatch(changeSearchQuery(q));
    }

    if (sending.q !== q || sending.categoryId !== categoryId) {
      dispatch(productsReadRequest({ categoryId, q }));
    }
  }, [dispatch, q, categoryId, sending.q, sending.categoryId]);

  const handleFilterChange = (options) => {
    const searchParams = createSearchParams(options);
    history.push(`catalog.html?${searchParams}`);
  };

  return (
    <View>
      <CatalogList
        search={true}
        onFilterChange={handleFilterChange}
      />
    </View>
  );
}

CatalogView.propTypes = {
};

export default CatalogView;
