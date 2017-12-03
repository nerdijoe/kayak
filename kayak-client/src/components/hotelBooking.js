/**
 * Created by ManaliJain on 11/29/17.
 */
import React,{Component} from 'react';
const moment = require('moment');

class HotelBooking extends Component{

    render(){
        let hotelsData = this.props.hotelsData;
        let hotelSelected = this.props.hotelSelected;
        const startDate = moment(hotelsData.searchParams.startDate, 'MM/DD/YYYY');
        const endDate = moment(hotelsData.searchParams.endDate, 'MM/DD/YYYY');
        const daysBooked = endDate.diff(startDate, 'days');
        let price = hotelSelected.price * daysBooked;

        return(
            <div>
                <div className = "col-sm-offset-1 col-sm-4">
                    <h4 className = "labelHeadings"> Your Booking Details </h4>
                    <br/>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Name :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{hotelSelected.name}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Place :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{hotelsData.searchParams.place}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Check in date :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{hotelsData.searchParams.startDate}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Check out Date :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{hotelsData.searchParams.endDate}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Room Size :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{hotelSelected.roomType}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Hotel Address :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">
                                <p className="booking-item-car-title">{hotelSelected.address}</p>
                                <p className="booking-item-car-title">{hotelSelected.city}</p>
                                <p className="booking-item-car-title">{hotelSelected.state}</p>
                                <p className="booking-item-car-title">{hotelSelected.country}</p>
                                <p className="booking-item-car-title">{hotelSelected.zipcode}</p>
                            </label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Guests :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{hotelsData.searchParams.guests}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Rooms :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{hotelsData.searchParams.rooms}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Price :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">${price}</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HotelBooking;
