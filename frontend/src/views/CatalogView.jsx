import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import View from './View.jsx';
import CatalogList from '../components/CatalogList.jsx';
import { changeCategoryId, changeSearchQuery, productsReadRequest } from '../store/productsSlice.js';
import { createSearchParams } from '../utils/index.js';

function CatalogView() {
  const dispatch = useDispatch();
  const { request } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const categoryId = params.get('categoryId') ? Number(params.get('categoryId')) : null;
  const q = params.get('q') ?? '';

  /* Update form values on change search parameters */
  useEffect(() => {
    if (request.categoryId !== categoryId) {
      dispatch(changeCategoryId(categoryId));
    }
    if (request.q !== q) {
      dispatch(changeSearchQuery(q));
    }

    if (request.q !== q || request.categoryId !== categoryId) {
      dispatch(productsReadRequest({ categoryId, q }));
    }
  }, [dispatch, q, categoryId, request.q, request.categoryId]);

  const handleFilterChange = (options) => {
    const searchParams = createSearchParams(options);
    navigate(`/catalog.html?${searchParams}`);
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
