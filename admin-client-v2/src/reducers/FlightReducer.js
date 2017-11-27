import * as actionType from '../actions/constants';

const initialState = {
  flights: [],
};

const FlightReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FLIGHT_ADD: {
      const newFlight = {
          flightNumber: action.data.flightNumber,
          departureTime: action.data.departureTime,
          arrivalTime: action.data.arrivalTime,
          departureAirport: action.data.departureAirport.name,
          arrivalAirport:action.data.arrivalAirport.name,
          airline: action.data.airline.name,
          prices: [
              {"type": "business", "price": action.data.prices[0].price},
              {"type": "economic", "price": action.data.prices[1].price},
              {"type": "first", "price": action.data.prices[2].price} ]
      }
      return {
        ...state,
        flights: [...state.flights, action.data],
      };
    }

    case actionType.FLIGHT_EDIT: {
      const updatedFlights = [...state.flights];
      const pos = updatedFlights.findIndex(i => i._id === action.data._id);
      if (pos !== -1) {
        updatedFlights.splice(pos, 1, action.data);
      }
      return {
        ...state,
        flights: updatedFlights,
      };
    }
    case actionType.FLIGHT_DELETE: {
      const updatedFlights = [...state.flights];
      const pos = updatedFlights.findIndex(i => i._id === action.data._id);
      if (pos !== -1) {

        updatedFlights[pos].isDeleted = true;
      }
      return {
        ...state,
        flights: updatedFlights,
      };
    }

    case actionType.FETCH_FLIGHT: {
      return {
        ...state,
        flights: [...action.data],
      };
    }

    case actionType.FETCH_AIRPORT: {
          return {
              ...state,
              airports: [...action.data],
      };
    }

    case actionType.FETCH_AIRLINE: {
          return {
              ...state,
              airlines: [...action.data],
      };
    }

    default:
      return state;
  }
};

export default FlightReducer;
