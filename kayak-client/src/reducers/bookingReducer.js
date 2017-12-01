/**
 * Created by ManaliJain on 11/28/17.
 */

const bookingSelected = {
    'bookingFlag': '',
    'carSelected' : '',
    'flightSelected': '',
    'hotelSelected': ''
}

export default function (state=bookingSelected,action){

    switch (action.type) {

        case "CAR_SELECTED":
            console.log("at reducer",action.data);
            const carState  = Object.assign({}, state, { carSelected: action.data});
            console.log("new sate",carState);
            return carState;

        case "HOTEL_SELECTED":
            console.log("at reducer",action.data);
            const hotelState  = Object.assign({}, state, { hotelSelected: action.data});
            console.log("new sate",hotelState);
            return hotelState;

        case "FLIGHT_SELECTED":
            console.log("at reducer",action.data);
            const flightState  = Object.assign({}, state, { flightSelected: action.data});
            console.log("new sate",flightState);
            return flightState;

        case "BOOKING_FLAG":
            console.log("at reducer",action.data);
            const flagState  = Object.assign({}, state, { bookingFlag: action.data});
            console.log("new sate",flagState);
            return flagState;

        default :
            return state;
    }
}

