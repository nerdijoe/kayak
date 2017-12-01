const axios = require("axios");

export const getCarBookings = (userToken) => {
    return axios.get('http://localhost:3010/carbillings/user' , {
        headers: { 'token': userToken }
    })
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
}
export const getHotelBookings = (userToken) => {
    return axios.get('http://localhost:3010/hotelbillings/user' , {
        headers: { 'token': userToken }
    })
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
}
export const getFlightBookings = (userToken) => {
    return axios.get('http://localhost:3010/flightbillings/user' , {
        headers: { 'token': userToken }
    })
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
}
export const makeCarBooking = (payload, userToken) => {

    return axios.post('http://localhost:3010/carbillings/book' , payload, {
        headers: { 'token': userToken }
    })
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};
export const makeHotelBooking = (payload, userToken) => {

    return axios.post('http://localhost:3010/hotelbillings/book' , payload, {
        headers: { 'token': userToken }
    })
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};
export const makeFlightBooking = (payload, userToken) => {

    return axios.post('http://localhost:3010/flightbillings/book' , payload, {
        headers: { 'token': userToken }
    })
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

