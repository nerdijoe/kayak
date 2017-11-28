const flightFilterState = {
        'filteredData' : ''
};
// const filteredData = {};

export default function (state=flightFilterState,action){

    switch (action.type) {
        case "FilteredData":
            console.log("flight data ",action.data);
            const newState2  = Object.assign({}, state, { FlighilteredData:action.data });
            // return {...state,filteredData:action.data};
            return newState2;
        default :
            return state
    }
}