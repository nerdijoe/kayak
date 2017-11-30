const hotelFilterState = {
    'hotelFilteredData' : ''
};

export default function (state=hotelFilterState,action){

    switch (action.type) {
        case "HOTEL_FILTERED_DATA":
            console.log("flight data ",action.data);
            const newState2  = Object.assign({}, state, { hotelFilteredData:action.data });
            return newState2;
        default :
            return state
    }
}