/**
 * Created by ManaliJain on 11/15/17.
 */
/*jshint esversion: 6 */
import {combineReducers} from 'redux';
import loginReducer from './loginReducer';

const allReducers = combineReducers({
    loginData: loginReducer
    // userMenu: userMenuReducer,
    // loginData: loginDataReducer,
    // interestUpdate: loginDataReducer,
    // aboutUpdate: loginDataReducer,
    // userFiles: userFilesReducer

});

export default allReducers;