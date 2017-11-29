/**
 * Created by ManaliJain on 11/22/17.
 */

const loginState = {
    'isLogged' : false,
    'loginData' : ''
}

export default function (state=loginState,action){

    switch (action.type) {
        case "LOGIN_DATA":
            // const newState = loginStatusState;
            console.log("at reducer",action.user);
            const newState  = Object.assign({}, state, { isLogged: action.flag , loginData: action.user});
            console.log("new sate",newState);
            return newState;
        default :
            return state
    }

}

