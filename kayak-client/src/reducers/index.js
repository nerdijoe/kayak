/**
 * Created by ManaliJain on 11/15/17.
 */
/*jshint esversion: 6 */
import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import flightData from './flight-data';

const allReducers = combineReducers({
    loginData: loginReducer,
    flightData:flightData
    // userMenu: userMenuReducer,
    // loginData: loginDataReducer,
    // interestUpdate: loginDataReducer,
    // aboutUpdate: loginDataReducer,
    // userFiles: userFilesReducer

});

export default allReducers;