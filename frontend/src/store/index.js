import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import topSalesReducer from './topSalesSlice.js';
import categoriesReducer from './categoriesSlice.js';
import productsReducer from './productsSlice.js';
import productDetailsReducer from './productDetailsSlice.js';
import imagesReducer from './imagesSlice.js';
import cartReducer, { initialState } from './cartSlice.js';
import { loadState, localStorageMiddleware } from './localStorage.js';
import saga from '../sagas/index.js';

const preloadedCart = loadState('cart');
const preloadedState = {
  cart: {
    ...initialState,
    items: preloadedCart ?? [],
  },
};

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
    categories: categoriesReducer,
    products: productsReducer,
    details: productDetailsReducer,
    images: imagesReducer,
    cart: cartReducer,
  },
  middleware: () => ([sagaMiddleware, localStorageMiddleware]),
  preloadedState,
});

sagaMiddleware.run(saga);

export default store;
