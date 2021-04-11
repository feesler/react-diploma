import {
  put,
  spawn,
  retry,
  takeLatest,
  select,
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
  readNext,
  readNextSuccess,
  readNextFailure,
  getProductsCount,
} from '../store/productsSlice';
import {
  requestTopSales,
  requestCategories,
  requestItems,
} from '../api';

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
function* handleProductsRequest(action) {
  try {
    const retryCount = 3;
    const retryDelay = 1000;
    const options = { ...action.payload };
    const data = yield retry(retryCount, retryDelay, requestItems, options);
    yield put(productsReadSuccess({ data, options }));
  } catch (e) {
    yield put(productsReadFailure(e.message));
  }
}

// worker
function* handleNextProductsRequest() {
  const productsCount = yield select(getProductsCount);
  try {
    const data = yield requestItems({ offset: productsCount });
    yield put(readNextSuccess({ data, options: { offset: productsCount } }));
  } catch (e) {
    yield put(readNextFailure(e.message));
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

// watcher
function* watchNextProductsSaga() {
  yield takeLatest(readNext.match, handleNextProductsRequest);
}

export default function* saga() {
  yield spawn(watchTopSalesSaga);
  yield spawn(watchCategoriesSaga);
  yield spawn(watchProductsSaga);
  yield spawn(watchNextProductsSaga);
}
