import {
  put,
  spawn,
  retry,
  takeLatest,
} from 'redux-saga/effects';
import {
  topSalesReadRequest,
  topSalesReadSuccess,
  topSalesReadFailure,
} from '../store/topSalesSlice';
import {
  categoriesReadRequest,
  categoriesReadSuccess,
  categoriesReadFailure,
} from '../store/categoriesSlice';
import {
  productsReadRequest,
  productsReadSuccess,
  productsReadFailure,
} from '../store/productsSlice';
import { requestTopSales, requestCategories, requestItems } from '../api';

// worker
function* handleTopSalesRequest() {
  try {
    const retryCount = 3;
    const retryDelay = 1000;
    const data = yield retry(retryCount, retryDelay, requestTopSales);
    yield put(topSalesReadSuccess(data));
  } catch (e) {
    yield put(topSalesReadFailure(e.message));
  }
}

// worker
function* handleCategoriesRequest() {
  try {
    const retryCount = 3;
    const retryDelay = 1000;
    const data = yield retry(retryCount, retryDelay, requestCategories);
    yield put(categoriesReadSuccess(data));
  } catch (e) {
    yield put(categoriesReadFailure(e.message));
  }
}

// worker
function* handleProductsRequest() {
  try {
    const retryCount = 3;
    const retryDelay = 1000;
    const data = yield retry(retryCount, retryDelay, requestItems);
    yield put(productsReadSuccess(data));
  } catch (e) {
    yield put(productsReadFailure(e.message));
  }
}

// watcher
function* watchTopSalesSaga() {
  yield takeLatest(topSalesReadRequest.match, handleTopSalesRequest);
}

// watcher
function* watchCategoriesSaga() {
  yield takeLatest(categoriesReadRequest.match, handleCategoriesRequest);
}

// watcher
function* watchProductsSaga() {
  yield takeLatest(productsReadRequest.match, handleProductsRequest);
}

export default function* saga() {
  yield spawn(watchTopSalesSaga);
  yield spawn(watchCategoriesSaga);
  yield spawn(watchProductsSaga);
}
