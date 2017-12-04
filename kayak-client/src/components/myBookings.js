/**
 * Created by ManaliJain on 11/23/17.
 */
import React, {Component} from 'react';
import CarBookingList from './carBookingList';
import HotelBookingList from './hotelBookingList';
import FlightBookingList from './flightBookingList';
import {loginData} from '../actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class MyBookings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            carBookings : '',
            hotelBookings : '',
            flightBookings : ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('user_token') === null) {
            this.props.history.push('/');
        }
    }

    render() {
            return(
                <div className="full-center" >
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className ="col-lg-12">
                                <main className="home-access" role="main">
                                    <ul className="home-access-sections-groups">
                                        <li className="home-access-section"> </li>

                                        <li className="home-access-section">
                                            <div className="starred">
                                                <h2 className="home-access-section__header">
                                                    <div className="home-access-section__title">
                                                        <div className="home-access-section__title-text">
                                                            <div>Your Car Bookings</div>
                                                        </div>
                                                    </div>
                                                </h2>
                                                <CarBookingList/>
                                            </div>
                                        </li>
                                        <li className="home-access-section">
                                            <div className="starred">
                                                <h2 className="home-access-section__header">
                                                    <div className="home-access-section__title">
                                                        <div className="home-access-section__title-text">
                                                            <div>Your Hotel Bookings</div>
                                                        </div>
                                                    </div>
                                                </h2>
                                                <HotelBookingList/>
                                            </div>
                                        </li>
                                        <li className="home-access-section">
                                            <div className="starred">
                                                <h2 className="home-access-section__header">
                                                    <div className="home-access-section__title">
                                                        <div className="home-access-section__title-text">
                                                            <div>Your Flight Bookings</div>
                                                        </div>
                                                    </div>
                                                </h2>
                                                <FlightBookingList/>
                                            </div>
                                        </li>
                                    </ul>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loginData: (data) => dispatch(loginData(data)),
    };
}

function mapStateToProps(state) {
    return{
        loginDataProp : state.loginData
    };
}

const MyBookingsPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(MyBookings));
export default MyBookingsPage;