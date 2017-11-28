/**
 * Created by ManaliJain on 11/27/17.
 */

const hotelState = {
    'hotelSearch' : '',
    'searchParams' : ''
}

export default function (state=hotelState,action){

    switch (action.type) {

        case "HOTEL_LIST":
            console.log("at reducer",action.data);
            const newState  = Object.assign({}, state, { hotelSearch: action.data, searchParams: action.search });
            console.log("new sate",newState);
            return newState;

        default :
            return state;
    }

}

