import * as actionType from '../actions/constants';

const initialState = {
  users: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_USER: {
      return {
        ...state,
        users: [...action.data],
      };
    }
    default:
      return state;
  }
};

export default UserReducer;
