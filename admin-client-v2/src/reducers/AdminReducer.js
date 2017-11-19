import * as actionType from '../actions/constants';

const initialState = {
  carBillingAll: [],
  carBillingCount: [],
  carBillingTotal: [],
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_CAR_BILLING_ALL: {
      return {
        ...state,
        carBillingAll: [...action.data],
      };
    }
    case actionType.FETCH_CAR_BILLING_COUNT: {
      return {
        ...state,
        carBillingCount: [...action.data],
      };
    }
    case actionType.FETCH_CAR_BILLING_TOTAL: {
      return {
        ...state,
        carBillingTotal: [...action.data],
      };
    }
    default:
      return state;
  }
};

export default AdminReducer;
