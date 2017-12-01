import * as actionType from '../actions/constants';

const initialState = {
  hotels: [],
};

const HotelReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case actionType.HOTEL_ADD: {
            const newHotel = {
                name: action.data.name,
                stars: action.data.stars,
                city: action.data.city,
                state: action.data.state,
                country: action.data.country,
                zipcode: action.data.zipcode,
                isDeleted: action.data.isDeleted,
                //rommType: action.data.rommType,
                //price: action.data.price,
            }
            return {
                ...state,
                hotels: [...state.hotels, action.data],
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
            };
        }

        case actionType.FETCH_HOTEL: {
            return {
                ...state,
                hotels: [...action.data],
            };
        }

        default:
            return state;
    }
}

export default HotelReducer;
