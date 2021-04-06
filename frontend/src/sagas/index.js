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
import { requestTopSales } from '../api';

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

// watcher
function* watchTopSalesSaga() {
  yield takeLatest(topSalesReadRequest.match, handleTopSalesRequest);
}

export default function* saga() {
  yield spawn(watchTopSalesSaga);
}
