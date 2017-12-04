/**
 * Created by ManaliJain on 11/24/17.
 */
import React, {Component} from 'react';
import * as API from '../api/bookings';

class FlightBookingList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            flightBookings: ''
        }
    }
    componentDidMount(){
        let userToken = localStorage.getItem('user_token');
        API.getFlightBookings(userToken)
            .then((flightRes) => {
                console.log("billing flight response came111",flightRes);
                if(flightRes.data !== null){
                    this.setState({
                        message: flightRes.data.message,
                        flightBookings: flightRes.data
                    });
                }

            }).catch( (error) => {
            this.setState({
                ...this.state
            });
        })
    }

    render() {
        if(this.state.flightBookings === ''){
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
                    {this.state.flightBookings.map((item, index) => {
                        let booking = item;
                        let sdate = booking.departureTime.split("T");
                        let startDate = sdate[0] + " " + sdate[1];
                        let edate = booking.arrivalTime.split("T");
                        let endDate = edate[0] + " " + edate[1];
                        return (
                            <div>
                                <ul className="myBooking-list ">
                                    <li className="bookedItem">
                                        <div className="booking-item-container">
                                            <div className="booking-item">
                                                <div className="row">
                                                    <div className="starred-item__content starred-item__title col-sm-2">
                                                        <p className="booking-item-flight-className labelColorBooking">Airline :</p>
                                                        <p className="booking-item-car-title">{booking.airline.name}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-1">
                                                        <p className="booking-item-flight-className labelColorBooking">Flight Number :</p>
                                                        <p className="booking-item-car-title">{booking.flightNumber}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-1">
                                                        <p className="booking-item-flight-className labelColorBooking">Class :</p>
                                                        <p className="booking-item-car-title">{booking.flight.class}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-1">
                                                        <p className="booking-item-flight-className labelColorBooking">Seats :</p>
                                                        <p className="booking-item-car-title">{booking.qtyBooked}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-1">
                                                        <p className="booking-item-flight-className labelColorBooking">Price :</p>
                                                        <p className="booking-item-car-title">${booking.totalAmount}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-1">
                                                        <p className="booking-item-flight-className labelColorBooking">Departure Time & date:</p>
                                                        <p className="booking-item-car-title">{startDate}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-1">
                                                        <p className="booking-item-flight-className labelColorBooking">Arrival Time & date:</p>
                                                        <p className="booking-item-car-title">{endDate}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-2">
                                                        <p className="booking-item-flight-className labelColorBooking">Source :</p>
                                                        <p className="booking-item-car-title">{booking.departureAirport.name}</p>
                                                    </div>
                                                    <div className="starred-item__content col-sm-2">
                                                        <p className="booking-item-flight-className labelColorBooking">Destination :</p>
                                                        <p className="booking-item-car-title">{booking.arrivalAirport.name}</p>
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

export default (FlightBookingList);