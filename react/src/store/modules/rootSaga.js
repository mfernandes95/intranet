import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import employee from './employee/sagas';

export default function* rootSaga() {
  return yield all([auth, employee]);
}
