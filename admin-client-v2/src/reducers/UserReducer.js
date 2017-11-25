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
        case actionType.EDIT_USER: {
            const updateUsers = [...state.users];
            const editedIndex = updateUsers.findIndex(i => i._id === action.data._id);

            if (editedIndex !== -1) {
                updateUsers.splice(editedIndex, 1, action.data);
            }
            return {
                ...state,
                users: updateUsers,
            };
        }
        default:
            return state;
    }
};

export default UserReducer;
