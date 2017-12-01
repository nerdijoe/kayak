/**
 * Created by ManaliJain on 11/27/17.
 */

const carState = {
    'carSearch' : '',
    'searchParams' : ''
}

export default function (state=carState,action){

    switch (action.type) {

        case "CAR_LIST":
            console.log("at reducer",action.data);
            const newState  = Object.assign({}, state, { carSearch: action.data, searchParams: action.search });
            console.log("new sate",newState);
            return newState;
        default :
            return state;
    }

}

