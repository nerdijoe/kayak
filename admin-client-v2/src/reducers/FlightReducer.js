import * as actionType from '../actions/constants';

const initialState = {
  flights: [],
  searchFlights: [],
};

const FlightReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FLIGHT_ADD: {

      return {
        ...state,
        flights: [...state.flights, action.data],
        searchFlights: [...state.searchFlights, action.data],
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
        searchFlights: updatedFlights,
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
        searchFlights: updatedFlights,
      };
    }

    case actionType.FETCH_FLIGHT: {
      return {
        ...state,
        flights: [...action.data],
      };
    }

      case actionType.FLIGHT_SEARCH: {
        const searchCriterion = action.data;
        const searchResult = state.flights.filter(function(flight){
          const inFlightNumber = flight.flightNumber.includes(searchCriterion);
          const inDepartureTime = flight.departureTime.includes(searchCriterion);
            const inArrivalTime = flight.arrivalTime.includes(searchCriterion);
            const inDepartureAirport = flight.departureAirport.name.includes(searchCriterion);
            const inArrivalAirport = flight.arrivalAirport.name.includes(searchCriterion);
            const inAirline = flight.airline.name.includes(searchCriterion);
            const inClass = flight.class.includes(searchCriterion);
            const inPrice = flight.price.toString().includes(searchCriterion);

          const result = inFlightNumber || inDepartureTime || inArrivalTime || inDepartureAirport || inArrivalAirport || inAirline || inClass || inPrice;
          return result;
        } );

          return {
              ...state,
              searchFlights: searchResult,
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
