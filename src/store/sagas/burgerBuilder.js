import axios from '../../axios-order';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* initIngredientsSaga(action) {
  try {
    const { data } = yield axios.get(
      'https://alirajabib-13818.firebaseio.com/ingredients.json'
    );

    yield put(actions.setIngredients(data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}
