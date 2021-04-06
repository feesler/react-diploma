import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import topSalesReducer from './topSalesSlice';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(saga);

export default store;
