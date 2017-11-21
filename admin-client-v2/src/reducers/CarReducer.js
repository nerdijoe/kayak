import * as actionType from '../actions/constants';

const initialState = {
  cars: [],
  dealers: [],
};

const CarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_NEW_CAR: {
      return {
        ...state,
        cars: [...state.cars, action.data],
      };
    }
    case actionType.FETCH_CAR: {
      return {
        ...state,
        cars: [...action.data],
      };
    }
    case actionType.FETCH_CAR_DEALER: {
      return {
        ...state,
        dealers: [...action.data],
      };
    }

    default:
      return state;
  }
};

export default CarReducer;
