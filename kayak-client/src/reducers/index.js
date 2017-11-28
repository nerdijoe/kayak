/**
 * Created by ManaliJain on 11/15/17.
 */
/*jshint esversion: 6 */
import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import flightData from './flight-data';
import filterFlightData from './filter-flight-data';

const allReducers = combineReducers({
    loginData: loginReducer,
    flightData:flightData,
    filteredData:filterFlightData
    // userMenu: userMenuReducer,
    // loginData: loginDataReducer,
    // interestUpdate: loginDataReducer,
    // aboutUpdate: loginDataReducer,
    // userFiles: userFilesReducer

});

export default allReducers;