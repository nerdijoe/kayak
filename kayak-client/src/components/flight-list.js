import React , {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

class FlightSearchList extends Component{
    handleFlightBooking=()=>{
        this.props.history.push('/booking');
        console.log('insdde booking flight');
    }
    render(){
        const flight = this.props.flight;
        console.log(flight);
        console.log(flight.imageURL);
        var days = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
        var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let departureDate = new Date(flight.departureTime);
        let arrivalDate = new Date(flight.arrivalTime);
        let durationHours = (((arrivalDate.getTime()-departureDate.getTime())/1000)/60)/60;
        let durationMinutes = (durationHours-Math.floor(durationHours))*60;
        const image = "http://localhost:3000/image/flight"+Math.floor(Math.random()*6)+".png";
        return(
            <li>
                <div className="booking-item-container">
                    <div className="booking-item">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="booking-item-airline-logo">
                                    <img src={image} alt="Failed to load Image"
                                         title="Image Title"/>
                                    <p>{flight.airlines.name} {flight.flightNumber}</p>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="booking-item-flight-details">
                                    <div className="booking-item-departure">
                                        <i className="fa fa-plane"></i>
                                        <h5>{departureDate.getHours()+":"+departureDate.getMinutes()}</h5>
                                        <p className="booking-item-date">{days[departureDate.getDay()]+", "+month[departureDate.getMonth()]+" "+departureDate.getDate()}</p>
                                        <p className="booking-item-destination">{flight.departureAirport.city+", "+flight.departureAirport.state+", "+flight.departureAirport.country}</p>
                                    </div>
                                    <div className="booking-item-arrival">
                                        <i className="fa fa-plane fa-flip-vertical"></i>
                                        <h5>{arrivalDate.getHours()+":"+arrivalDate.getMinutes()}</h5>
                                        <p className="booking-item-date">{days[arrivalDate.getDay()]+", "+month[arrivalDate.getMonth()]+" "+arrivalDate.getDate()}</p>
                                        <p className="booking-item-destination">{flight.arrivalAirport.city+", "+flight.arrivalAirport.state+", "+flight.arrivalAirport.country}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2" >
                                <h5>Duration</h5>
                                <h5>{durationHours+"h "+durationMinutes+"m"}</h5>
                            </div>
                            <div className="col-md-3"><span className="booking-item-price">${flight.price}</span><span>/person</span>
                                <p className="booking-item-flight-class">Class: {flight.class}</p>
                                <button className="btn btn-primary"  onClick={this.handleFlightBooking}>Select</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        // loginData: (data) => dispatch(loginData(data)),
    };
}

function mapStateToProps(state) {
    return{
        // loginDataProp : state.loginData
    };
}

const flightSearchList = withRouter(connect(mapStateToProps, mapDispatchToProps)(FlightSearchList));
export default flightSearchList;