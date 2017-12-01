import React , {Component} from 'react';
import {cBookingSelected, bookingFlag} from "../actions/index";
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

class CarList extends Component{
    handleCarBooking=()=>{
        let carSelection = this.props.car;
        let payload = 'C';
        this.props.cBookingSelected(carSelection);
        this.props.bookingFlag(payload);
        this.props.history.push('/booking');
        console.log('insdde booking car');
    }
    render(){
        const car = this.props.car;
        console.log(car);
        let imageURL = "http://localhost:3000/image/car"+Math.floor(Math.random()*6)+".png";
        return(
            <li>
                <div className="booking-item">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="booking-item-car-img">
                                <img src={imageURL} alt="Image Alternative text" title="Image Title" />
                                <p className="booking-item-car-title">{car.model} {car.make}</p>
                            </div>
                            <br/>
                            <p className="booking-item-flight-className">Type :</p>
                            <p className="booking-item-car-title">{car.type}</p>
                        </div>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="booking-item-features booking-item-features-sign clearfix">
                                        <li rel="tooltip" data-placement="top" title="Passengers"><i className="fa fa-male"></i><span className="booking-item-feature-sign">x {car.capacity}</span>
                                        </li>
                                        <li rel="tooltip" data-placement="top" title="Doors"><i className="im im-car-doors"></i><span className="booking-item-feature-sign">x {car.doorNumber}</span>
                                        </li>
                                        <li rel="tooltip" data-placement="top" title="Baggage Quantity"><i className="fa fa-briefcase"></i><span className="booking-item-feature-sign">x 2</span>
                                        </li>
                                        <li rel="tooltip" data-placement="top" title="Automatic Transmission"><i className="im im-shift-auto"></i><span className="booking-item-feature-sign">auto</span>
                                        </li>
                                    </ul>
                                    <ul className="booking-item-features booking-item-features-small clearfix">
                                        <li rel="tooltip" data-placement="top" title="Satellite Navigation"><i className="im im-satellite"></i>
                                        </li>
                                        <li rel="tooltip" data-placement="top" title="FM Radio"><i className="im im-fm"></i>
                                        </li>
                                        <li rel="tooltip" data-placement="top" title="Tilt Steering Wheel"><i className="im im-car-wheel"></i>
                                        </li>
                                        <li rel="tooltip" data-placement="top" title="Power Windows"><i className="im im-car-window"></i>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <p className="booking-item-flight-className">Pick Up :</p>
                                    <p className="booking-item-car-title">Address:{car.dealer.address}</p>
                                    <p className="booking-item-car-title">city:{car.dealer.city}</p>
                                    <p className="booking-item-car-title">state:{car.dealer.state}</p>
                                    <p className="booking-item-car-title">country:{car.dealer.country}</p>
                                    <p className="booking-item-car-title">zipcode:{car.dealer.zipcode}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="booking-item-flight-className">Description :</p>
                                    <p className="booking-item-car-title">{car.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2"><span className="booking-item-price">${car.price}</span><span>/day</span>
                            <p className="booking-item-flight-className">{car.dealer.name}</p>
                            <button className="btn btn-book"  onClick={this.handleCarBooking}>Book</button>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        cBookingSelected: (data) => dispatch(cBookingSelected(data)),
        bookingFlag: (data) => dispatch(bookingFlag(data))
    };
}

function mapStateToProps(state) {
    return{
        bookingSelectedProp : state.cBookingSelected,
        bookingFlagProp : state.bookingFlag
    };
}

const carList = withRouter(connect(mapStateToProps, mapDispatchToProps)(CarList));
export default carList;