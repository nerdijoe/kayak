/**
 * Created by ManaliJain on 11/24/17.
 */
import React, {Component} from 'react';
import * as API from '../api/bookings';

class CarBookingList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            carBookings:'',
            message:''
        }
    }

    render() {

        let userToken = localStorage.getItem('user_token');
        API.getCarBookings(userToken)
            .then((res) => {
                console.log("billing car response came111",res);
                if(res.data !== null) {
                    this.setState({
                        message: res.data.message,
                        carBookings: res.data
                    });
                }
            }).catch( (error) => {
            this.setState({
                ...this.state
            });
        });

        if(this.state.carBookings === ''){
            return(
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
            )
        } else{
            return (
                    <div>
                        {this.state.carBookings.map((item, index) => {
                            let booking = item;
                                let sdate = booking.startDate.split("T");
                                let startDate = sdate[0];
                                let edate = booking.endDate.split("T");
                                let endDate = edate[0];
                            return (
                                <ul className="myBooking-list ">
                                             <li className="bookedItem">
                                                 <div className="booking-item-container">
                                                     <div className="booking-item">
                                                         <div className="row">
                                                             <div className="starred-item__content starred-item__title col-sm-2">
                                                                 <p className="booking-item-flight-className labelColorBooking">Place :</p>
                                                                 <p className="booking-item-car-title">{booking.dealer.city}</p>
                                                             </div>
                                                             <div className="starred-item__content col-sm-1">
                                                                 <p className="booking-item-flight-className labelColorBooking">Number of Days Booked :</p>
                                                                 <p className="booking-item-car-title">{booking.daysBooked}</p>
                                                             </div>
                                                             <div className="starred-item__content col-sm-1">
                                                                 <p className="booking-item-flight-className labelColorBooking">Model :</p>
                                                                 <p className="booking-item-car-title">{booking.car.model}</p>
                                                             </div>
                                                             <div className="starred-item__content col-sm-1">
                                                                 <p className="booking-item-flight-className labelColorBooking">Type :</p>
                                                                 <p className="booking-item-car-title">{booking.car.type}</p>
                                                             </div>
                                                             <div className="starred-item__content col-sm-1">
                                                                 <p className="booking-item-flight-className labelColorBooking">Capacity :</p>
                                                                 <p className="booking-item-car-title">{booking.car.capacity}</p>
                                                             </div>
                                                             <div className="starred-item__content col-sm-1">
                                                                 <p className="booking-item-flight-className labelColorBooking">Pick-up by :</p>
                                                                 <p className="booking-item-car-title">{startDate}</p>
                                                             </div>
                                                             <div className="starred-item__content col-sm-1">
                                                                 <p className="booking-item-flight-className labelColorBooking">Drop by :</p>
                                                                 <p className="booking-item-car-title">{endDate}</p>
                                                             </div>
                                                             <div className="starred-item__content col-sm-1">
                                                                 <p className="booking-item-flight-className labelColorBooking">Price :</p>
                                                                 <p className="booking-item-car-title">${booking.totalAmount}</p>
                                                             </div>
                                                             <div className="starred-item__content col-sm-3">
                                                                 <p className="booking-item-flight-className labelColorBooking">Dealer Address :</p>
                                                                 <p className="booking-item-car-title">{booking.dealer.address}</p>
                                                                 <p className="booking-item-car-title">{booking.dealer.city}</p>
                                                                 <p className="booking-item-car-title">{booking.dealer.state} {booking.dealer.country}
                                                                      {booking.dealer.zipcode}</p>
                                                             </div>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </li>
                                         </ul>
                            );
                        })}
                    </div>
            );

        }
    }
}

export default (CarBookingList);