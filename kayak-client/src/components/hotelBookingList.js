/**
 * Created by ManaliJain on 11/24/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as API from '../api/bookings';

class HotelBookingList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hotelBookings:'',
            message:''
        }
    }

    render() {
        let userToken = localStorage.getItem('user_token');
        API.getHotelBookings(userToken)
            .then((hotelRes) => {
                console.log("billing hotel response came111",hotelRes);
                if(hotelRes.data !== null){
                    this.setState({
                        message: hotelRes.data.message,
                        hotelBookings: hotelRes.data
                    });
                }
            }).catch( (error) => {
            this.setState({
                ...this.state
            });
        });


        if(this.state.hotelBookings === ''){
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
        } else {
            return(
                <div>
                    {this.state.hotelBookings.map((item, index) => {
                        let booking = item;
                        let sdate = booking.startDate.split("T");
                        let startDate = sdate[0];
                        let edate = booking.endDate.split("T");
                        let endDate = edate[0];
                        return (
                            <div>
                                <ul className="myBooking-list ">
                                    <li className="bookedItem">
                                        <div className="booking-item-container">
                                            <div className="booking-item">
                                                <div className="row">
                                                    <div className="starred-item__content starred-item__title col-sm-2">
                                                        <p className="booking-item-flight-className labelColorBooking">
                                                            Hotel Name :</p>
                                                        <p className="booking-item-car-title">{booking.hotel.name}</p>
                                                    </div>
                                                    <div className="starred-item__content starred-item__title col-sm-1">
                                                        <p className="booking-item-flight-className labelColorBooking">
                                                            Place :</p>
                                                        <p className="booking-item-car-title">{booking.hotel.city}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-1">
                                                        <p className="booking-item-flight-className labelColorBooking">
                                                            Number of Days Booked :</p>
                                                        <p className="booking-item-car-title">{booking.daysBooked}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-1">
                                                        <p className="booking-item-flight-className labelColorBooking">
                                                            Rooms Booked :</p>
                                                        <p className="booking-item-car-title">{booking.qtyBooked}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-1">
                                                        <p className="booking-item-flight-className labelColorBooking">
                                                            Rooms Type :</p>
                                                        <p className="booking-item-car-title">{booking.hotel.roomType}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-1">
                                                        <p className="booking-item-flight-className labelColorBooking">
                                                            Check in Date :</p>
                                                        <p className="booking-item-car-title">{startDate}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-1 labelColorBooking">
                                                        <p className="booking-item-flight-className">Check out Date
                                                            :</p>
                                                        <p className="booking-item-car-title">{endDate}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-1">
                                                        <p className="booking-item-flight-className labelColorBooking">
                                                            Price :</p>
                                                        <p className="booking-item-car-title">
                                                            ${booking.totalAmount}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-3">
                                                        <p className="booking-item-flight-className labelColorBooking">
                                                            Hotel Address :</p>
                                                        <p className="booking-item-car-title">{booking.hotel.address}</p>
                                                        <p className="booking-item-car-title">{booking.hotel.city}</p>
                                                        <p className="booking-item-car-title">{booking.hotel.state} {booking.hotel.country}
                                                            {booking.hotel.zipcode}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        );
                    })
                    }
                </div>
            );
        }

    }
}

export default (HotelBookingList);