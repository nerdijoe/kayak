import * as actionType from '../actions/constants';

const initialState = {
  hotels: [],
  searchHotels: [],
};

const HotelReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case actionType.HOTEL_ADD: {
            return {
                ...state,
                hotels: [...state.hotels, action.data],
                searchHotels: [...state.searchHotels, action.data],
            };
        }

        case actionType.HOTEL_EDIT: {
            const updatedHotels = [...state.hotels];
            const pos = updatedHotels.findIndex(i => i._id === action.data._id);
            if (pos !== -1) {
                updatedHotels.splice(pos, 1, action.data);
            }
            return {
                ...state,
                hotels: updatedHotels,
                searchHotels: updatedHotels,
            };
        }
        case actionType.HOTEL_DELETE: {
            const updatedHotels = [...state.hotels];
            const pos = updatedHotels.findIndex(i => i._id === action.data._id);
            if (pos !== -1) {
                updatedHotels[pos].isDeleted = true;
            }
            return {
                ...state,
                hotels: updatedHotels,
                searchHotels: updatedHotels,
            };
        }

        case actionType.FETCH_HOTEL: {
            return {
                ...state,
                hotels: [...action.data],
            };
        }

        case actionType.HOTEL_SEARCH: {
            const searchCriterion = action.data;
            const searchResult = state.hotels.filter(function(hotel){
                const inName = hotel.name.includes(searchCriterion);
                /*const inDepartureTime = flight.departureTime.includes(searchCriterion);
                const inArrivalTime = flight.arrivalTime.includes(searchCriterion);
                const inDepartureAirport = flight.departureAirport.name.includes(searchCriterion);
                const inArrivalAirport = flight.arrivalAirport.name.includes(searchCriterion);
                const inAirline = flight.airline.name.includes(searchCriterion);
                const inClass = flight.class.includes(searchCriterion);
                const inPrice = flight.price.toString().includes(searchCriterion);*/

                const result = inName;
                    /*|| inDepartureTime || inArrivalTime || inDepartureAirport || inArrivalAirport || inAirline || inClass || inPrice;*/
                return result;
            } );

            return {
                ...state,
                searchHotels: searchResult,
        };
        }

        default:
            return state;
    }
}

export default HotelReducer;
