/**
 * Created by ManaliJain on 11/30/17.
 */

const flightState = {
    'flightSearch' : '',
    'searchParams' : ''
}

export default function (state=flightState,action){

    switch (action.type) {

        case "FLIGHT_LIST":
            console.log("at reducer",action.data);
            const newState  = Object.assign({}, state, { flightSearch: action.data, searchParams: action.search });
            console.log("new sate",newState);
            return newState;

        default :
            return state;
    }

}

