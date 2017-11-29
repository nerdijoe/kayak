/**
 * Created by ManaliJain on 11/28/17.
 */

const carSelected = {
    'carSelected' : '',
    'flightSelected': '',
    'hotelSelected': '',
}

export default function (state=carSelected,action){

    switch (action.type) {

        case "CAR_SELECTED":
            console.log("at reducer",action.data);
            const newState  = Object.assign({}, state, { carSelected: action.data});
            console.log("new sate",newState);
            return newState;

        default :
            return state;
    }



}

