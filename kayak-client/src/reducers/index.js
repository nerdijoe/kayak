/**
 * Created by ManaliJain on 11/15/17.
 */
/*jshint esversion: 6 */
import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import flightData from './flight-data';
import carsReducer from './carsReducer';
import hotelsReducer from './hotelsReducer';

const allReducers = combineReducers({
    loginData: loginReducer,
    flightData:flightData,
    carsData : carsReducer,
    hotelsReducer : hotelsReducer
});

export default allReducers;