/**
 * Created by ManaliJain on 11/27/17.
 */
const axios = require("axios");

export const getFlightList = (payload) => {
    console.log("payload", payload);
    // let apiCall = departure=San Jose&arrivalAt=New York&class=Economy&departureDate=11/25/2017
    console.log("`http://localhost:3010/flights/search?departure=${payload.source}&arrivalAt=${payload.destination");
    return axios.get(`http://localhost:3010/flights/search?departure=${payload.source}&arrivalAt=${payload.destination}&departureDate=${payload.departureDate}`, payload)
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const getCarList = (payload) => {
    // let apiCall = departure=San Jose&arrivalAt=New York&class=Economy&departureDate=11/25/2017
    return axios.get(`http://localhost:3010/cars/search?city=${payload.location}`)
    //  return axios.get(`http://localhost:3010/cars`)
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const getHotelList = (payload) => {
    return axios.get(`http://localhost:3010/hotels/search?city=${payload.place}`)
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

