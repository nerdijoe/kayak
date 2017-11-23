import * as actionType from '../actions/constants';

const initialState = {
  cars: [],
  dealers: [],
};

const CarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CAR_ADD: {
      return {
        ...state,
        cars: [...state.cars, action.data],
      };
    }
    case actionType.CAR_EDIT: {
      const updatedCars = [...state.cars];
      const pos = updatedCars.findIndex(i => i._id === action.data._id);
      if (pos !== -1) {
        updatedCars.splice(pos, 1, action.data);
      }
      return {
        ...state,
        cars: updatedCars,
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
