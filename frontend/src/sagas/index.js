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
} from '../store/topSalesSlice.js';
import {
  categoriesReadRequest,
  categoriesReadSuccess,
  categoriesReadFailure,
} from '../store/categoriesSlice.js';
import {
  productsReadRequest,
  productsReadSuccess,
  productsReadFailure,
  readNext,
  readNextSuccess,
  readNextFailure,
  getProducts,
} from '../store/productsSlice.js';
import {
  detailsReadRequest,
  detailsReadSuccess,
  detailsReadFailure,
} from '../store/productDetailsSlice.js';
import {
  orderRequest,
  orderRequestSuccess,
  orderRequestFailure,
} from '../store/cartSlice.js';
import {
  requestTopSales,
  requestCategories,
  requestItems,
  requestItemDetails,
  submitOrder,
} from '../api/index.js';

const retryCount = 3;
const retryDelay = 1000;

// worker
function* handleTopSalesRequest() {
  try {
    const data = yield retry(retryCount, retryDelay, requestTopSales);
    yield put(topSalesReadSuccess(data));
  } catch (e) {
    yield put(topSalesReadFailure(e.message));
  }
}

// worker
function* handleCategoriesRequest() {
  try {
    const data = yield retry(retryCount, retryDelay, requestCategories);
    yield put(categoriesReadSuccess(data));
  } catch (e) {
    yield put(categoriesReadFailure(e.message));
  }
}

// worker
function* handleProductsRequest(action) {
  try {
    const filter = { ...action.payload };
    const data = yield retry(retryCount, retryDelay, requestItems, filter);
    yield put(productsReadSuccess({ data }));
  } catch (e) {
    yield put(productsReadFailure(e.message));
  }
}

// worker
function* handleNextProductsRequest() {
  try {
    const products = yield select(getProducts);
    if (!products || !products.items) {
      throw new Error('Invalid state');
    }

    const filter = {
      ...products.current,
      offset: products.items.length,
    };

    const data = (products.moreAvailable)
      ? yield retry(retryCount, retryDelay, requestItems, filter)
      : [];
    yield put(readNextSuccess({ data }));
  } catch (e) {
    yield put(readNextFailure(e.message));
  }
}

// worker
function* handleDetailsRequest(action) {
  try {
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
    const { order, navigate } = action.payload;
    yield call(submitOrder, order);
    yield put(orderRequestSuccess());
    yield put(navigate('/cart.html?submit=ok'));
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
