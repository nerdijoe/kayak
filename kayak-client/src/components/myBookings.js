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
import * as API from '../api/bookings';

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
        } else{
            let userToken = localStorage.getItem('user_token');
            // API.getCarBookings(userToken)
            //     .then((res) => {
            //         console.log("billing car response came111",res);
            //         if(res.data !== null){
            //             this.setState({
            //                 message: res.data.message,
            //                 carBookings: res.data
            //             });
            //         }
            //         API.getHotelBookings(userToken)
            //             .then((hotelRes) => {
            //                 console.log("billing hotel response came111",hotelRes);
            //                 if(hotelRes.data !== null){
            //                     this.setState({
            //                         message: hotelRes.data.message,
            //                         hotelBookings: hotelRes.data
            //                     });
            //                 }
            //                 API.getFlightBookings(userToken)
            //                     .then((flightRes) => {
            //                         console.log("billing flight response came111",flightRes);
            //                         if(flightRes.data !== null){
            //                             this.setState({
            //                                 message: flightRes.data.message,
            //                                 flightBookings: flightRes.data
            //                             });
            //                         }
            //
            //                     }).catch( (error) => {
            //                     this.setState({
            //                         ...this.state
            //                     });
            //                 })
            //             }).catch( (error) => {
            //             this.setState({
            //                 ...this.state
            //             });
            //         })
            //     }).catch( (error) => {
            //     this.setState({
            //         ...this.state
            //     });
            // })

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
    }

    render() {
        let carBookingList =null;
        let hotelBookingList=null;
        let flightBookingList=null;
        // if(this.state.carBookings === '' || this.state.carBookings === undefined){
        //     carBookingList = <CarBookingList key='' carBooking=''/>;
        // } else {
        //     carBookingList =  this.state.carBookings.map((item, index) => {
        //         return (
        //             <CarBookingList
        //                 key={index}
        //                 carBooking={item}
        //             />
        //         );
        //     })
        // }
        if(this.state.hotelBookings === '' || this.state.hotelBookings === undefined){
            hotelBookingList = <HotelBookingList key='' hotelBooking=''/>;
        } else {
            hotelBookingList =  this.state.hotelBookings.map((item, index) => {
                return (
                    <HotelBookingList
                        key={index}
                        hotelBooking={item}
                    />
                );
            })
        }
        // if(this.state.flightBookings === '' || this.state.flightBookings === undefined){
        //     flightBookingList = <FlightBookingList key='' flightBooking=''/>;
        // } else {
        //     hotelBookingList =  this.state.flightBookings.map((item, index) => {
        //         return (
        //             <FlightBookingList
        //                 key={index}
        //                 flightBooking={item}
        //             />
        //         );
        //     })
        // }
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
                                                        <div>Car Bookings</div>
                                                    </div>
                                                </div>
                                            </h2>
                                            {carBookingList}
                                        </div>
                                    </li>
                                    <li className="home-access-section">
                                        <div className="starred">
                                            <h2 className="home-access-section__header">
                                                <div className="home-access-section__title">
                                                    <div className="home-access-section__title-text">
                                                        <div>Hotel Bookings</div>
                                                    </div>
                                                </div>
                                            </h2>
                                            {hotelBookingList}
                                        </div>
                                    </li>
                                    <li className="home-access-section">
                                        <div className="starred">
                                            <h2 className="home-access-section__header">
                                                <div className="home-access-section__title">
                                                    <div className="home-access-section__title-text">
                                                        <div>Flight Bookings</div>
                                                    </div>
                                                </div>
                                            </h2>
                                            {flightBookingList}
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