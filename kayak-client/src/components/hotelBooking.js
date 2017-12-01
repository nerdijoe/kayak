/**
 * Created by ManaliJain on 11/29/17.
 */
import React,{Component} from 'react';
const moment = require('moment');

class HotelBooking extends Component{

    render(){
        let hotelsData = this.props.hotelData;
        let hotelSelected = this.props.hotelSelected;
        const startDate = moment(hotelsData.searchParams.startDate, 'MM/DD/YYYY');
        const endDate = moment(hotelsData.searchParams.endDate, 'MM/DD/YYYY');
        const daysBooked = endDate.diff(startDate, 'days');
        let price = hotelSelected.price * daysBooked;

        return(
            <div>
                <div className = "col-sm-offset-1 col-sm-4">
                    {/*<h4 className = "labelHeadings"> Your Booking Details </h4>*/}
                    {/*<br/>*/}
                    {/*<div className="form-group row">*/}
                        {/*<label className="col-sm-4 col-form-label labelColorBooking">Place :</label>*/}
                        {/*<div className="col-sm-6">*/}
                            {/*<label className="col-form-label labelColorBooking">{carsData.searchParams.location}</label>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="form-group row">*/}
                        {/*<label className="col-sm-4 col-form-label labelColorBooking">Check in date :</label>*/}
                        {/*<div className="col-sm-6">*/}
                            {/*<label className="col-form-label labelColorBooking">{carsData.searchParams.startDate}</label>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="form-group row">*/}
                        {/*<label className="col-sm-4 col-form-label labelColorBooking">Check out Date :</label>*/}
                        {/*<div className="col-sm-6">*/}
                            {/*<label className="col-form-label labelColorBooking">{carsData.searchParams.endDate}</label>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="form-group row">*/}
                        {/*<label className="col-sm-4 col-form-label labelColorBooking">Room Size :</label>*/}
                        {/*<div className="col-sm-6">*/}
                            {/*<label className="col-form-label labelColorBooking">{carSelected.capacity}</label>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="form-group row">*/}
                        {/*<label className="col-sm-4 col-form-label labelColorBooking">Hotel Address :</label>*/}
                        {/*<div className="col-sm-6">*/}
                            {/*<label className="col-form-label labelColorBooking">*/}
                                {/*<p className="booking-item-car-title">{carSelected.dealer.address}</p>*/}
                                {/*<p className="booking-item-car-title">{carSelected.dealer.city}</p>*/}
                                {/*<p className="booking-item-car-title">{carSelected.dealer.state}</p>*/}
                                {/*<p className="booking-item-car-title">{carSelected.dealer.country}</p>*/}
                                {/*<p className="booking-item-car-title">{carSelected.dealer.zipcode}</p>*/}
                            {/*</label>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="form-group row">*/}
                        {/*<label className="col-sm-4 col-form-label labelColorBooking">Guests :</label>*/}
                        {/*<div className="col-sm-6">*/}
                            {/*<label className="col-form-label labelColorBooking">{carSelected.type}</label>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="form-group row">*/}
                        {/*<label className="col-sm-4 col-form-label labelColorBooking">Rooms :</label>*/}
                        {/*<div className="col-sm-6">*/}
                            {/*<label className="col-form-label labelColorBooking">{carSelected.make}</label>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="form-group row">*/}
                        {/*<label className="col-sm-4 col-form-label labelColorBooking">Price :</label>*/}
                        {/*<div className="col-sm-6">*/}
                            {/*<label className="col-form-label labelColorBooking">{carSelected.model}</label>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="form-group row">*/}
                        {/*<label className="col-sm-4 col-form-label labelColorBooking">Price :</label>*/}
                        {/*<div className="col-sm-6">*/}
                            {/*<label className="col-form-label labelColorBooking">${price}</label>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                </div>
            </div>
        )
    }
}

export default HotelBooking;
