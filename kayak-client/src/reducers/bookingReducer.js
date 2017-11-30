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
            const newState  = Object.assign({}, state, { carSelected: action.data});
            console.log("new sate",newState);
            return newState;

        case "BOOKING_FLAG":
            console.log("at reducer",action.data);
            const flagState  = Object.assign({}, state, { bookingFlag: action.data});
            console.log("new sate",newState);
            return flagState;

        default :
            return state;
    }
}

