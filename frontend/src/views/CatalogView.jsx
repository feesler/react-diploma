import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import View from './View.jsx';
import CatalogList from '../components/CatalogList.jsx';
import { changeSearchQuery } from '../store/productsSlice';
import { createSearchParams } from '../utils';

function CatalogView() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const categoryId = Number(params.get('categoryId')) ?? null;
  const query = params.get('q') ?? '';

  useEffect(() => {
    dispatch(changeSearchQuery(query));
  }, [dispatch, query]);

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
