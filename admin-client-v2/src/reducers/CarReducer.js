import * as actionType from '../actions/constants';

const initialState = {
  cars: [],
};

const CarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_CAR: {
      return {
        ...state,
        cars: [...action.data],
      };
    }
    default:
      return state;
  }
};

export default CarReducer;
