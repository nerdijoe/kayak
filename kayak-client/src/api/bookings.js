const axios = require("axios");

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

