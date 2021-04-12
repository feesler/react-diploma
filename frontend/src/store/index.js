import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import topSalesReducer from './topSalesSlice';
import categoriesReducer from './categoriesSlice';
import productsReducer from './productsSlice';
import productDetailsReducer from './productDetailsSlice';
import imagesReducer from './imagesSlice';
import cartReducer, { initialOwner, initialValidation } from './cartSlice';
import { loadState, localStorageMiddleware } from './localStorage';
import saga from '../sagas';

const preloadedCart = loadState('cart');
const preloadedState = {
  cart: {
    items: preloadedCart ?? [],
    owner: { ...initialOwner },
    validation: { ...initialValidation },
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
  middleware: [sagaMiddleware, localStorageMiddleware],
  preloadedState,
});

sagaMiddleware.run(saga);

export default store;
