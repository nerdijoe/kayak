/**
 * Created by ManaliJain on 11/27/17.
 */
const axios = require("axios");

export const getFlightList = (payload) => {
    console.log("payload", payload);
    let jwtToken =localStorage.getItem('user_token');
    if(!jwtToken){
        jwtToken ='';
    }
    // let apiCall = departure=San Jose&arrivalAt=New York&class=Economy&departureDate=11/25/2017
    console.log("`http://localhost:3010/flights/search?departure=${payload.source}&arrivalAt=${payload.destination");
    return axios.get(`http://localhost:3010/flights/search?departure=${payload.source}&arrivalAt=${payload.destination}&departureDate=${payload.departureDate}&class=${payload.classType}&seats=${payload.seats}`,
        {headers:{token:jwtToken}})
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
    let jwtToken =localStorage.getItem('user_token');
    if(!jwtToken){
        jwtToken ='';
    }
    return axios.get(`http://localhost:3010/cars/search?city=${payload.location}&startDate=${payload.startDate}&endDate=${payload.endDate}`,{headers:{token:jwtToken}})
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
    let jwtToken =localStorage.getItem('user_token');
    if(!jwtToken){
        jwtToken ='';
    }
    return axios.get(`http://localhost:3010/hotels/search?city=${payload.place}&rooms=${payload.rooms}&guests=${payload.guests}&startDate=${payload.startDate}&endDate=${payload.endDate}`,
        {headers:{ token : jwtToken}
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

