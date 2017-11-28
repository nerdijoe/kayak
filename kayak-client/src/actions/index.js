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

export const filterData = (data) => {
    console.log("filteredData", data);
    return {
        type: "FilteredData",
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

export const hotelsData = (data, search) => {
    console.log("hotelList", data);
    return {
        type: "HOTEL_LIST",
        data,
        search
    }
}
