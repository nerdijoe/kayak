import * as actionType from '../actions/constants';

const initialState = {
  hotels: [],
  searchHotels: [],
};

const HotelReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case actionType.HOTEL_ADD: {
            state.searchHotels = [...state.hotels];
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
                const inStars = hotel.stars.toString().includes(searchCriterion);
                const inAddress = hotel.address.includes(searchCriterion);
                const inCity = hotel.city.includes(searchCriterion);
                const inState = hotel.state.includes(searchCriterion);
                const inCountry = hotel.country.includes(searchCriterion);
                const inZipcode = hotel.zipcode.includes(searchCriterion);
                const inRoomType = hotel.roomType.includes(searchCriterion);
                const inPrice = hotel.price.toString().includes(searchCriterion);

                const result = inName || inStars || inAddress || inCity || inState || inCountry || inZipcode || inRoomType || inPrice;

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
