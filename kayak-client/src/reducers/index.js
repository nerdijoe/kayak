/**
 * Created by ManaliJain on 11/15/17.
 */
import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import flightData from './flight-data';
import carsReducer from './carsReducer';
import hotelsReducer from './hotelsReducer';
import flightsReducer from './flightsReducer';
import flightFilteredData from './filter-flight-data';
import carFilteredData from './filter-car-data';
import bookingReducer from './bookingReducer';

const allReducers = combineReducers({
    loginData: loginReducer,
    flightData:flightData,
    carsData : carsReducer,
    hotelsData : hotelsReducer,
    flightsData : flightsReducer,
    flightFilteredData:flightFilteredData,
    carFilteredData:carFilteredData,
    bookingSelected: bookingReducer

});

export default allReducers;