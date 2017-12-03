/**
 * Created by ManaliJain on 11/24/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

class HotelBookingList extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const hbooking =  this.props.hotelBooking;
        console.log("booking",hbooking);

        if(hbooking !== ''){
            let sdate = hbooking.startDate.split("T");
            let startDate = sdate[0];
            let edate = hbooking.endDate.split("T");
            let endDate = edate[0];
            return (
                <div>
                    <ul className="myBooking-list ">
                        <li className="bookedItem">
                            <div className="booking-item-container">
                                <div className="booking-item">
                                    <div className="row">
                                        <div className="starred-item__content starred-item__title col-sm-2">
                                            <p className="booking-item-flight-className labelColorBooking">Hotel Name :</p>
                                            <p className="booking-item-car-title">{hbooking.hotel.name}</p>
                                        </div>
                                        <div className="starred-item__content starred-item__title col-sm-1">
                                            <p className="booking-item-flight-className labelColorBooking">Place :</p>
                                            <p className="booking-item-car-title">{hbooking.hotel.city}</p>
                                        </div>
                                        <div className="starred-item__content col-sm-1">
                                            <p className="booking-item-flight-className labelColorBooking">Number of Days Booked :</p>
                                            <p className="booking-item-car-title">{hbooking.daysBooked}</p>
                                        </div>
                                        <div className="starred-item__content col-sm-1">
                                            <p className="booking-item-flight-className labelColorBooking">Rooms Booked :</p>
                                            <p className="booking-item-car-title">{hbooking.qtyBooked}</p>
                                        </div>
                                        <div className="starred-item__content col-sm-1">
                                            <p className="booking-item-flight-className labelColorBooking">Rooms Type :</p>
                                            <p className="booking-item-car-title">{hbooking.hotel.roomType}</p>
                                        </div>
                                        <div className="starred-item__content col-sm-1">
                                            <p className="booking-item-flight-className labelColorBooking">Check in Date :</p>
                                            <p className="booking-item-car-title">{startDate}</p>
                                        </div>
                                        <div className="starred-item__content col-sm-1 labelColorBooking">
                                            <p className="booking-item-flight-className">Check out Date :</p>
                                            <p className="booking-item-car-title">{endDate}</p>
                                        </div>
                                        <div className="starred-item__content col-sm-1">
                                            <p className="booking-item-flight-className labelColorBooking">Price :</p>
                                            <p className="booking-item-car-title">${hbooking.totalAmount}</p>
                                        </div>
                                        <div className="starred-item__content col-sm-3">
                                            <p className="booking-item-flight-className labelColorBooking">Hotel Address :</p>
                                            <p className="booking-item-car-title">{hbooking.hotel.address}</p>
                                            <p className="booking-item-car-title">{hbooking.hotel.city}</p>
                                            <p className="booking-item-car-title">{hbooking.hotel.state} {hbooking.hotel.country}
                                                {hbooking.hotel.zipcode}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            );
        }else {
            return (
                <div>
                    <div className = "row">
                        <ul className="starred-list">
                            <li className="starred-item">
                                <div className="starred-item__content">

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }

    }
}

export default (HotelBookingList);