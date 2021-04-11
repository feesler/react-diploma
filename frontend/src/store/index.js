import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import topSalesReducer from './topSalesSlice';
import categoriesReducer from './categoriesSlice';
import productsReducer from './productsSlice';
import imagesReducer from './imagesSlice';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
    categories: categoriesReducer,
    products: productsReducer,
    images: imagesReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(saga);

export default store;
