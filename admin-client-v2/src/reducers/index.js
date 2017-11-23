import { combineReducers } from 'redux';

import AdminReducer from './AdminReducer';
import CarReducer from './CarReducer';
import UserReducer from './UserReducer';

const KayakAdmin = combineReducers({
  AdminReducer,
  CarReducer,
  UserReducer,
});

export default KayakAdmin;
