import { put } from 'redux-saga/effects';

import axios from '../../axios-order';
import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {
  try {
    yield put(actions.purchaseBurgerStart());
    const { data } = yield axios.post(
      '/orders.json?auth=' + action.token,
      action.orderData
    );
    yield put(actions.purchaseBurgerSuccess(data.name, action.orderData));
  } catch (error) {
    put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  try {
    yield put(actions.fetchOrdersStart());
    const queryParams =
      '?auth=' +
      action.token +
      '&orderBy="userId"&equalTo="' +
      action.userId +
      '"';
    const { data } = yield axios.get('/orders.json' + queryParams);
    const fetchedOrders = [];
    for (let key in data) {
      fetchedOrders.push({ ...data[key], id: key });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
