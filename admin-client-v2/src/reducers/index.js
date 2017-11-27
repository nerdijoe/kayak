import { combineReducers } from 'redux';

import AdminReducer from './AdminReducer';
import CarReducer from './CarReducer';
import UserReducer from './UserReducer';
import FlightReducer from './FlightReducer';

const KayakAdmin = combineReducers({
  AdminReducer,
  CarReducer,
  UserReducer,
  FlightReducer,
});

export default KayakAdmin;
