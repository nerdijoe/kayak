/**
 * Created by ManaliJain on 9/29/17.
 */
const axios = require("axios")
// const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'


export const signup = (payload) => {
    console.log("payload", payload)
    return axios.post('http://localhost:3010/auth/signup', payload)
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const login = (payload) => {
    console.log("payload", payload)
    return axios.post('http://localhost:3010/auth/signin', payload)
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const signout = () => {
    return axios.post('http://localhost:3010/signout', {}
    )
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const update = (payload) => {
    let id = payload.id;
    return axios.put(`http://localhost:3000/users/${id}`, payload
    )
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

        // axios.put(`http://localhost:3000/users/${id}`, user)