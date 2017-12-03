import * as actionType from '../actions/constants';

const initialState = {
  users: [],
  searchUsers: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_USER: {
      return {
        ...state,
        users: [...action.data],
        searchUsers: [...action.data],
      };
    }
    case actionType.EDIT_USER: {
      const updateUsers = [...state.users];
      const editedIndex = updateUsers.findIndex(i => i.id === action.data.id);

      if (editedIndex !== -1) {
        updateUsers.splice(editedIndex, 1, action.data);
      }
      return {
        ...state,
        users: updateUsers,
        searchUsers: updateUsers,
      };
    }

      case actionType.USER_SEARCH: {
          const searchCriterion = action.data;
          const searchResult = state.users.filter(function(user){
              const inFirstName = user.firstName.includes(searchCriterion);
              const inlastName = user.lastName.includes(searchCriterion);
              const inEmail = user.email.includes(searchCriterion);
              const inAddress = user.address.includes(searchCriterion);
              const inCity = user.city.includes(searchCriterion);
              const inState = user.state.includes(searchCriterion);
              const inZipcode = user.zipcode.includes(searchCriterion);
              const inPhone = user.phone.includes(searchCriterion);

              const result = inFirstName || inlastName || inEmail || inAddress || inCity || inState || inZipcode || inPhone;
              return result;
          } );

          return {
              ...state,
              searchUsers: searchResult,
      };
      }

    default:
      return state;
  }
};

export default UserReducer;
