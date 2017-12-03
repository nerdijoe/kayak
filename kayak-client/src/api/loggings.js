const axios = require("axios");

export const logData = (payload) => {


    console.log("payload", payload);
    let logData = {};
    if (localStorage.getItem('user_login_data')!== null){
        let userLoginData = JSON.parse(localStorage.getItem('user_login_data'));
        logData = {
            userId:userLoginData.id,
            url:payload
        };
    }
    else{
        logData = {
            userId:0,
            url:payload
        };
    }
    return axios.post('http://localhost:3010/logs/pages', logData)
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log("error in logging data for: "+payload,error);
            return error
        });
};