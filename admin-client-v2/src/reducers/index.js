import { combineReducers } from 'redux';

import AdminReducer from './AdminReducer';
import CarReducer from './CarReducer';

const KayakAdmin = combineReducers({
  AdminReducer,
  CarReducer,
});

export default KayakAdmin;
