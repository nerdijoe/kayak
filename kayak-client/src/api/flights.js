import axios from 'axios';

export const getFlightList = (payload) => {
    console.log("payload", payload);
    // let apiCall = departure=San Jose&arrivalAt=New York&class=Economy&departureDate=11/25/2017
    return axios.get(`http://localhost:3010/flight/search?departure=${payload.source}&arrivalAt=${payload.destination}&class=${payload.classType}&date=${payload.departureDate}`)
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};