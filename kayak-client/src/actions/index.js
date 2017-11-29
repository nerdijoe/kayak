/**
 * Created by ManaliJain on 11/22/17.
 */

export const loginData = (flag, user) => {
    console.log("action", flag);
    console.log("action", user);
    return {
        type: "LOGIN_DATA",
        flag,
        user
    }
}

export const flightFilterData = (data) => {
    console.log("filteredData", data);
    return {
        type: "FLIGHT_FILTERED_LIST",
        data
    }
}

export const carsData = (data, search) => {
    console.log("carList", data);
    return {
        type: "CAR_LIST",
        data,
        search
    }
}
export const carFilterData = (data) => {
    console.log("filteredData", data);
    return {
        type: "CAR_FILTERED_DATA",
        data
    }
}

export const hotelsData = (data, search) => {
    console.log("hotelList", data);
    return {
        type: "HOTEL_LIST",
        data,
        search
    }
}

export const carSelected = (data)=> {
    console.log("hotelList ssssssss", data);
    return {
        type: "CAR_SELECTED",
        data
    }
}

export const bookingFlag = (data)=> {
    console.log("hotelList ssssssss", data);
    return {
        type: "BOOKING_FLAG",
        data
    }
}
