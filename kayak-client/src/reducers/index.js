/**
 * Created by ManaliJain on 11/15/17.
 */
/*jshint esversion: 6 */
import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import flightData from './flight-data';
import carsReducer from './carsReducer';
import hotelsReducer from './hotelsReducer';
import flightFilteredData from './filter-flight-data';
import carFilteredData from './filter-car-data'

const allReducers = combineReducers({
    loginData: loginReducer,
    flightData:flightData,
    carsData : carsReducer,
    hotelsReducer : hotelsReducer,
    flightFilteredData:flightFilteredData,
    carFilteredData:carFilteredData
});

export default allReducers;