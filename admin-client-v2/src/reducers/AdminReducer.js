import * as actionType from '../actions/constants';

const initialState = {
  admin: {},
  is_authenticated: false,
  carBillingAll: [],
  carBillingCount: [],
  carBillingTotal: [],
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADMIN_SIGNIN: {
      // not sure what to do here
      return {
        ...state,
        is_authenticated: true,
      };
    }
    case actionType.ADMIN_SIGNOUT: {
      return {
        ...state,
        is_authenticated: false,
      };
    }
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
