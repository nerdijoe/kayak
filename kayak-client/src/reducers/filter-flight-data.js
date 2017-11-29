const flightFilterState = {
        'flightFilteredData' : ''
};
// const filteredData = {};

export default function (state=flightFilterState,action){

    switch (action.type) {
        case "FLIGHT_FILTERED_LIST":
            console.log("flight data ",action.data);
            const newState2  = Object.assign({}, state, { flightFilteredData:action.data });
            return newState2;
        default :
            return state
    }
}