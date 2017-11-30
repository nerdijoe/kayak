/**
 * Created by ManaliJain on 11/16/17.
 */

import React, {Component} from 'react';
import Search from './search';
import UpdateUser from './updateUser';
import * as API from '../api/userLogin';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginData} from '../actions/index';
import * as Validate from '../validation/signupValidation';
import MyBookings from './myBookings';
import BookingPage from './bookingPage';
import {Button, Modal, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap';
import FlightSearch from './flight-search';
import CarSearch from './car-search';
import HotelSearch from './hotel-search';

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activePage: '',
            showModal : false,
            showModalLogin : false,
            showModalSuccess : false,
            message : '',
            messageDivLogin : '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address : '',
            city : '',
            state : '',
            zipcode : '',
            phone : '',
            profileImage : '',
            creditCardNum : '',
            creditCardFullName : ''
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModalLogin = this.openModalLogin.bind(this);
        this.closeModalLogin = this.closeModalLogin.bind(this);
        this.openModalSuccess = this.openModalSuccess.bind(this);
        this.closeModalSuccess = this.closeModalSuccess.bind(this);
    }


    closeModal() {
        this.setState({
            ...this.state,
            showModal: false
        });
    }
    openModal() {
        this.setState({ showModal: true });
    }
    closeModalLogin() {
        this.setState({ showModalLogin: false });
    }
    openModalLogin() {
        this.setState({ showModalLogin: true });
    }
    closeModalSuccess() {
        this.setState({ showModalSuccess: false });
    }
    openModalSuccess() {
        this.setState({ showModalSuccess: true });
    }

    componentWillMount() {
        document.body.style.backgroundImage = "url(../image/phoenix-hotels-bg.jpg)";
    }
    handleUserSignIn = (event) => {
        var valid = Validate.signup(this.state);
        if(valid === ''){
            let payload ={
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zipcode: this.state.zipcode,
                phone: this.state.phone,
                profileImage : this.state.profileImage,
                creditCardNum: this.state.creditCardNum,
                creditCardFullName: this.state.creditCardFullName,
            }
            this.UserSignUpAPICall(payload);
        }else{
            this.setState({
                ...this.state,
                message: valid
            });
            event.preventDefault();
        }
    }

    UserSignUpAPICall = (payload) => {
        console.log("payload is ",payload);
        API.signup(payload)
            .then((res) => {
                if (res.data.message) {
                    this.setState({
                        ...this.state,
                        message: res.data.message
                    });
                }
                else {
                    console.log('axiosSignUp', res);
                    this.closeModal();
                    this.setState({
                        ...this.state,
                        message: ''
                    });
                    this.openModalSuccess();
                    // localStorage.setItem('user_token', "123456678990");
                    // localStorage.setItem('user_login_data', JSON.stringify(user));
                    // localStorage.setItem('is_user_logged', true);
                    // this.props.loginData(true, user);
                }
            });
    }

    handleUserLogIn = (event) => {
        var valid = Validate.login(this.state);
        if(valid === ''){
            let payload ={
                email: this.state.email,
                password: this.state.password,
            }
            this.UserSignInAPICall(payload);

        }else{
            this.setState({
                ...this.state,
                messageDivLogin: valid
            });
            event.preventDefault();
        }
    }

    UserSignInAPICall = (payload) => {
        console.log("payload is ",payload);
        API.login(payload)
            .then((res) => {
                    console.log('axiosSignIn', res);
                    localStorage.setItem('user_token', res.data.token);
                    localStorage.setItem('user_login_data', JSON.stringify(res.data));
                    localStorage.setItem('is_user_logged', true);
                    this.props.loginData(true, res.data);
                    this.closeModalLogin();
                    this.setState({
                        ...this.state,
                        email: '',
                        password: '',
                        messageDivLogin: ''
                    });
            }).catch((err) => {
            this.setState({
                ...this.state,
                messageDivLogin: "Username and Password doesn't match"
            });
        })
    }

    handleLogout = () => {
        // API.signout()
        //     .then((res) => {
        //         if (res.data.statusCode === 401) {
        //             window.sessionStorage.removeItem('jwtToken');
        //             this.props.loginState(false);
        //         } else {
        //             console.log("error occured");
        //         }
        //     });
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_login_data');
        localStorage.removeItem('is_user_logged');
        this.props.history.push('/');
    }

    render() {
        let messagediv =null;
        if(this.state.message !== ''){
            messagediv = <div className="clearfix">
                <div className="alert alert-danger text-center" role="alert">{this.state.message}</div>
            </div>;
        } else{
            messagediv = <div></div>;
        }

        let messageDivLogin =null;
        if(this.state.messageDivLogin !== ''){
            messageDivLogin = <div className="clearfix">
                <div className="alert alert-danger text-center" role="alert">{this.state.messageDivLogin}</div>
            </div>;
        } else{
            messageDivLogin = <div></div>;
        }

        // let loginData = this.props.loginDataProp;
        let bookings = null;
        let isLoggedIn =null;
        let loggedFlag = localStorage.getItem('is_user_logged');

        if(loggedFlag === null){
            isLoggedIn = <li>
                {/*<a href="#" onClick={() => {*/}
                            {/*//this.props.history.push("/signup");*/}
                            {/*this.openModal();*/}
                            {/*}}>SignUp</a>*/}
                <div className = "headerSign" onClick={() => {
                    this.openModal();}}>
                    SignUp
                </div>
                        </li>
        } else{
            let loginData = localStorage.getItem('user_login_data');
            let name = JSON.parse(loginData);
            isLoggedIn = <li>
                {/*<a href="/updateUser" onClick={() => {*/}
                        {/*this.props.history.push("/updateUser");*/}
                        {/*}}>Hello {name.firstName}</a>*/}
                <div className = "headerSign" onClick={() => {
                    this.props.history.push("/updateUser");}}>
                    Hello {name.firstName}
                </div>
                         </li>
        }

        let signout =null;
        if(loggedFlag === null){
            signout = <li>
                {/*<a href="/#" onClick={() => {*/}
                        {/*// this.props.history.push("/signin");*/}
                        {/*this.openModalLogin();*/}
                    {/*}}>SignIn</a>*/}
                <div className = "headerSign" onClick={() => {
                    this.openModalLogin();}}>
                    SignIn
                </div>
                    </li>
        } else{
            signout = <li>
                {/*<a href="/#" onClick={() => {*/}
                            {/*this.handleLogout();*/}
                        {/*}}>Logout</a>*/}
                <div className = "headerSign" onClick={() => {
                    this.handleLogout();
                }}>
                    Logout
                </div>
                      </li>

            bookings = <li>
                {/*<a href="/myBookings" onClick={() => {*/}
                            {/*this.props.history.push("/myBookings");*/}
                        {/*}}>My Bookings</a>*/}
                <div className = "headerSign"  onClick={() => {
                    this.props.history.push("/myBookings");
                }}>
                    My Bookings
                </div>
                        </li>
        }

        return (
            <div className="container-fluid">
                <header id="main-header">
                    <div className="container">
                        <div className="nav">
                            <div className="row">
                                <div className="col-sm-offset-1 col-sm-5">
                                    <ul className="slimmenu">
                                        <li className="logo"> </li>
                                        <li><a href="/hotels" onClick={() => {
                                            // this.setActive('hotels');
                                            this.props.history.push("/hotels");
                                        }}>Hotels</a>
                                        </li>

                                        <li><a href="/flights" onClick={() => {
                                            // this.setActive('flights');
                                            this.props.history.push("/flights");
                                        }}>Flights</a>
                                        </li>

                                        <li><a href="/cars" onClick={() => {
                                            // this.setActive('cars');
                                            this.props.history.push("/cars");
                                        }}>Cars</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-sm-4 col-sm-offset-2">
                                    <ul className="slimmenu">
                                        {isLoggedIn}
                                        {bookings}
                                        {signout}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {messagediv}
                        <div className="row justify-content-md-center">
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-5 col-form-label">
                                    All Fields are Mandatory
                                </label>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">First Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" placeholder="First Name"
                                           value={this.state.firstName}
                                           onChange={(event) => {
                                               this.setState({...this.state,firstName: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Last Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" placeholder="Last Name"
                                           value={this.state.lastName}
                                           onChange={(event) => {
                                               this.setState({...this.state,lastName: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Email</label>
                                <div className=" col-sm-8">
                                    <input type="text"  className="form-control"  placeholder="email@example.com"
                                           value={this.state.email}
                                           onChange={(event) => {
                                               this.setState({...this.state,email: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-8">
                                    <input type="password" className="form-control" placeholder="Password"
                                           value={this.state.password}
                                           onChange={(event) => {
                                               this.setState({...this.state,password: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Address</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" placeholder="Address"
                                           value={this.state.address}
                                           onChange={(event) => {
                                               this.setState({...this.state,address: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">City</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="inputPassword" placeholder="City"
                                           value={this.state.city}
                                           onChange={(event) => {
                                               this.setState({...this.state,city: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">State</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="inputPassword" placeholder="State"
                                           value={this.state.state}
                                           onChange={(event) => {
                                               this.setState({...this.state,state: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Zip Code</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control"  placeholder="95112"
                                           value={this.state.zipcode}
                                           onChange={(event) => {
                                               this.setState({...this.state,zipcode: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Phone</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="inputPassword" placeholder="+1 222 222 2222"
                                           value={this.state.phone}
                                           onChange={(event) => {
                                               this.setState({...this.state,phone: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Profile Image URL</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control"  placeholder="Paste your URL"
                                           value={this.state.profileImage}
                                           onChange={(event) => {
                                               this.setState({...this.state,profileImage: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Credit card Number</label>
                                <div className="col-sm-8">
                                    <input type="number" className="form-control"  placeholder="4067123445389032"
                                           value={this.state.creditCardNum}
                                           onChange={(event) => {
                                               this.setState({...this.state,creditCardNum: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Credit Card Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" placeholder="JON SMITH"
                                           value={this.state.creditCardFullName}
                                           onChange={(event) => {
                                               this.setState({...this.state,creditCardFullName: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button  type="button" onClick={this.handleUserSignIn}>Register</Button>
                        <Button onClick={() => this.closeModal()}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showModalLogin} onHide={() => this.closeModalLogin()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {messageDivLogin}
                        <div className="row justify-content-md-center">
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-5 col-form-label">
                                    All Fields are Mandatory
                                </label>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Email</label>
                                <div className=" col-sm-8">
                                    <input type="text"  className="form-control"  placeholder="email@example.com"
                                           value={this.state.email}
                                           onChange={(event) => {
                                               this.setState({...this.state,email: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-8">
                                    <input type="password" className="form-control" placeholder="Password"
                                           value={this.state.password}
                                           onChange={(event) => {
                                               this.setState({...this.state,password: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button  type="button" onClick={this.handleUserLogIn}>SignIn</Button>
                        <Button onClick={() => this.closeModalLogin()}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showModalSuccess} onHide={() => this.closeModalSuccess()}>
                    <Modal.Header closeButton>
                        <Modal.Title>SignUp Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row justify-content-md-center">
                            <div className="form-group row">
                                <div className="col-sm-offset-1 col-sm-10 col-sm-offset-1">
                                    <div className="alert alert-success text-center" role="alert">You have successfully Signup. Please Login to continue</div>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.closeModalSuccess()}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Route exact path="/" component={() => (
                    <div>
                        <Search selection="hotels"/>
                    </div>
                )}/>
                <Route exact path="/hotels" render={() => (
                    <div>
                        <Search selection="hotels"/>
                    </div>
                )}/>
                <Route exact path="/flights" render={() => (
                    <div>
                        <Search selection="flights"/>
                    </div>
                )}/>
                <Route exact path="/cars" render={() => (
                    <div>
                        <Search selection="cars"/>
                    </div>
                )}/>
                <Route exact path="/flights/search" render={() => (
                    <div>
                        <FlightSearch/>
                    </div>
                )}/>
                <Route exact path="/cars/search" render={() => (
                    <div>
                        <CarSearch/>
                    </div>
                )}/>
                <Route exact path="/hotels/search" render={() => (
                    <div>
                        <HotelSearch/>
                    </div>
                )}/>
                <Route exact path="/updateUser" render={() => (
                    <div>
                        <UpdateUser/>
                    </div>
                )}/>
                <Route exact path="/myBookings" render={() => (
                    <div>
                        <MyBookings/>
                    </div>
                )}/>
                <Route exact path="/booking" render={() => (
                    <div>
                        <BookingPage/>
                    </div>
                )}/>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginData: (flag, user) => dispatch(loginData(flag,user))
    };
}

function mapStateToProps(state) {
    console.log("state App", state);
    return{
        loginDataProp : state.loginData
    };
}

// export default withRouter(HomePage);
const homepage = withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
export default homepage;