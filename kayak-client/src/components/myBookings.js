/**
 * Created by ManaliJain on 11/23/17.
 */
import React, {Component} from 'react';
import * as API from '../api/userLogin';
import BookingList from './bookingList';
import {loginData} from '../actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
class MyBookings extends Component{
    constructor(props) {
        super(props);
        // // let loginData = this.props.loginDataProp;
        // let userLoginData = localStorage.getItem('user_login_data');
        // let loginData = null;
        // if(userLoginData !== null)
        // {
        //     loginData = JSON.parse(userLoginData);
        // }
        this.state = {
            bookings : ''
        }
    }
    componentWillMount(){
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "lightgrey";
    }

    componentDidMount() {
        if (localStorage.getItem('user_token') === null) {
            this.props.history.push('/');
        } else{

        }
    }

    // handleSubmitForAbout=(event) => {
    //     var valid = Validate.about(this.state);
    //     if (valid === '') {
    //         var loginData = this.props.loginDataProp;
    //         this.setState({
    //             ...this.state,
    //             "_id": loginData._id,
    //             "id": loginData.id,
    //             "uuid": loginData.uuid
    //         }, this.callAPI);
    //     } else {
    //         this.setState({
    //             ...this.state,
    //             message: valid
    //         });
    //         event.preventDefault();
    //     }
    // }
    //
    // callAPI = () => {
    //     API.saveAbout(this.state)
    //         .then((res) => {
    //             if (res.data.statusCode === 201) {
    //                 this.setState({
    //                     isLoggedIn: true,
    //                     message: res.data.message
    //                 });
    //                 let overview ={
    //                     "work": this.state.work,
    //                     "education":this.state.education,
    //                     "phone":this.state.phone,
    //                     "events": this.state.events
    //                 }
    //                 this.props.aboutUpdate(JSON.stringify(overview));
    //             } else if (res.data.statusCode === 500) {
    //                 this.setState({
    //                     isLoggedIn: false,
    //                     message: res.data.message
    //                 });
    //             } else if(res.data.statusCode === 400) {
    //                 this.setState({
    //                     isLoggedIn: false,
    //                     message: res.data.message
    //                 });
    //             } else if (res.data.statusCode === 601  || res.data.statusCode === 600) {
    //                 alert("Token expired or invalid. Please login again");
    //                 this.setState({
    //                     isLoggedIn: false,
    //                     message: res.data.message
    //                 });
    //                 sessionStorage.removeItem("jwtToken");
    //                 this.props.loginState(false);
    //             }
    //         });
    // };

    render() {
        let bookingList ='';
        if(this.state.bookings === '' || this.state.bookings === undefined){
            bookingList = <BookingList key='' booking=''/>;
        } else {
            bookingList =  this.state.group.map((item, index) => {
                return (
                    <BookingList
                        key={index}
                        booking={item}
                    />
                );
            })
        }
        return(
            <div className="bg-front full-center" >
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
                                                        <div>My Bookings</div>
                                                    </div>
                                                </div>
                                            </h2>
                                            {bookingList}
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