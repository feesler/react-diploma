import {
  put,
  call,
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
  getProducts,
} from '../store/productsSlice';
import {
  detailsReadRequest,
  detailsReadSuccess,
  detailsReadFailure,
} from '../store/productDetailsSlice';
import {
  orderRequest,
  orderRequestSuccess,
  orderRequestFailure,
} from '../store/cartSlice';
import {
  requestTopSales,
  requestCategories,
  requestItems,
  requestItemDetails,
  submitOrder,
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
  try {
    const products = yield select(getProducts);
    const options = { ...products.options, offset: products.items.length };

    if (!products.moreAvailable) {
      yield put(readNextSuccess({ data: [], options }));
      return;
    }

    const data = yield requestItems(options);
    yield put(readNextSuccess({ data, options }));
  } catch (e) {
    yield put(readNextFailure(e.message));
  }
}

// worker
function* handleDetailsRequest(action) {
  try {
    const retryCount = 3;
    const retryDelay = 1000;
    const id = action.payload;
    const data = yield retry(retryCount, retryDelay, requestItemDetails, id);
    yield put(detailsReadSuccess({ data }));
  } catch (e) {
    yield put(detailsReadFailure(e.message));
  }
}

// worker
function* handleOrderRequest(action) {
  try {
    const order = action.payload;
    yield call(submitOrder, order);
    yield put(orderRequestSuccess());
  } catch (e) {
    yield put(orderRequestFailure(e.message));
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
function* watchDetailsSaga() {
  yield takeLatest(detailsReadRequest.match, handleDetailsRequest);
}

// watcher
function* watchNextProductsSaga() {
  yield takeLatest(readNext.match, handleNextProductsRequest);
}

// watcher
function* watchOrderSaga() {
  yield takeLatest(orderRequest.match, handleOrderRequest);
}

export default function* saga() {
  yield spawn(watchTopSalesSaga);
  yield spawn(watchCategoriesSaga);
  yield spawn(watchProductsSaga);
  yield spawn(watchDetailsSaga);
  yield spawn(watchNextProductsSaga);
  yield spawn(watchOrderSaga);
}
