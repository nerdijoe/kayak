const flightFilterState = {
    'carFilteredData' : ''
};

export default function (state=flightFilterState,action){

    switch (action.type) {
        case "CAR_FILTERED_DATA":
            console.log("flight data ",action.data);
            const newState2  = Object.assign({}, state, { carFilteredData:action.data });
            return newState2;
        default :
            return state
    }
}