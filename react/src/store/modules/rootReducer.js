import { combineReducers } from 'redux';

import auth from './auth/reducer';
import employee from './employee/reducer';

export default combineReducers({
  auth,
  employee,
});
