/**
 * Created by ManaliJain on 11/22/17.
 */
export const LOGIN_STATE = 'LOGIN_STATE';

// export const loginState = (flag) => {
//     console.log("action", flag)
//     return {
//         type: "LOGIN_STATE",
//         flag
//     }
// }
export const loginData = (flag, user) => {
    console.log("action", flag);
    console.log("action", user);
    return {
        type: "LOGIN_DATA",
        flag,
        user
    }
}

// export const userMenu = (flag) => {
//     return {
//         type: "MENU_SELECTED",
//         flag
//     }
// }
//
// export const interestUpdate = (interest) => {
//     return {
//         type: "LOGIN_DATA_INTEREST_UPDATE",
//         interest
//     }
// }
//
// export const aboutUpdate = (about) => {
//     return {
//         type: "LOGIN_DATA_ABOUT_UPDATE",
//         about
//     }
// }
//
// export const userFiles = (payload) => {
//     return {
//         type: "USER_FILE",
//         payload
//     }
// }