import * as actionType from '../actions/constants';

const initialState = {
  cars: [],
  dealers: [],
  searchCars: [],
};

const CarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CAR_ADD: {
      state.searchCars = [...state.cars];
      return {
        ...state,
        cars: [...state.cars, action.data],
        searchCars: [...state.searchCars, action.data],
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
        searchCars: updatedCars,
      };
    }
    case actionType.CAR_DELETE: {
      const updatedCars = [...state.cars];
      const pos = updatedCars.findIndex(i => i._id === action.data._id);
      if (pos !== -1) {
        // updatedCars.splice(pos, 1, action.data);
        updatedCars[pos].isDeleted = true;
      }
      return {
        ...state,
        cars: updatedCars,
        searchCars: updatedCars,
      };
    }

    case actionType.FETCH_CAR: {
      return {
        ...state,
        cars: [...action.data],
        searchCars: [...action.data],
      };
    }
    case actionType.FETCH_CAR_DEALER: {
      return {
        ...state,
        dealers: [...action.data],
      };
    }

    case actionType.CAR_SEARCH: {
          const searchCriterion = action.data;
          const searchResult = state.cars.filter(function(car){
              const inDealer = car.dealer.name.includes(searchCriterion);
              const inType = car.type.includes(searchCriterion);
              const inMake = car.make.includes(searchCriterion);
              const inModel = car.model.includes(searchCriterion);
              const inPrice = car.price.toString().includes(searchCriterion);
              const inDoors = car.doorNumber.toString().includes(searchCriterion);
              const inCapacity = car.capacity.toString().includes(searchCriterion);


              const result = inDealer || inType || inMake || inModel || inPrice || inDoors || inCapacity ;
              return result;
          } );

          return {
              ...state,
              searchCars: searchResult,
      };
    }

    default:
      return state;
  }
};

export default CarReducer;
