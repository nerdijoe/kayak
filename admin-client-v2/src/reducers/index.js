import { combineReducers } from 'redux';

import AdminReducer from './AdminReducer';
import CarReducer from './CarReducer';
import UserReducer from './UserReducer';
import FlightReducer from './FlightReducer';
import HotelReducer from './HotelReducer';

const KayakAdmin = combineReducers({
  AdminReducer,
  CarReducer,
  UserReducer,
  FlightReducer,
  HotelReducer,
});

export default KayakAdmin;
