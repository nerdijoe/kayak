/**
 * Created by ManaliJain on 11/29/17.
 */
import React,{Component} from 'react';
const moment = require('moment');

class FlightBooking extends Component{

    render(){
        let flightsData = this.props.flightsData;
        let flightSelected = this.props.flightSelected;
        const dTime = flightSelected.departTime.split("T");
        const aTime = flightSelected.arrivalTime.split("T");
        const startDate = dTime[0] + " " + dTime[1];
        const endDate = aTime[0] + " " + aTime[1];
        // const startDate = moment(flightsData.searchParams.startDate, 'MM/DD/YYYY');
        // const endDate = moment(flightsData.searchParams.endDate, 'MM/DD/YYYY');
        // const daysBooked = endDate.diff(startDate, 'days');
        let price = flightSelected.price * flightsData.searchParams.seats;

        return(
            <div>
                <div className = "col-sm-offset-1 col-sm-4">
                    <h4 className = "labelHeadings"> Your Booking Details </h4>
                    <br/>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Airline :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{flightSelected.airlines}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Flight Number :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{flightSelected.flightNumber}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Source :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{flightSelected.origin}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Destination :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{flightSelected.destination}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Departure Time & date:</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{startDate}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Arrival Time & Date :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{endDate}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Class :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{flightSelected.class}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label labelColorBooking">Seats :</label>
                        <div className="col-sm-6">
                            <label className="col-form-label labelColorBooking">{flightsData.searchParams.seats}</label>
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

export default FlightBooking;
