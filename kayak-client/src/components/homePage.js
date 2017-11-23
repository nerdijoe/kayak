/**
 * Created by ManaliJain on 11/16/17.
 */

import React, {Component} from 'react';
// import Flight from './flights';
// import Hotel from './hotels';
// import Car from './cars';
// import Header from './header';
import Search from './search';
import * as API from '../api/userLogin';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginData} from '../actions/index';
import * as Validate from '../validation/signupValidation';
import {Button, Modal, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap';
class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activePage: '',
            showModal : false,
            showModalLogin : false,
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
            creditCardNumber : '',
            creditCardName : ''
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        // this.openModalDir = this.openModalDir.bind(this);
        // this.closeModalDir = this.closeModalDir.bind(this);
    }

    // issActive = (value) => {
    //     return ((value === this.state.activePage) ? 'active' : '');
    // }
    // setActive = (value) => {
    //     this.setState({
    //         ...this.state,
    //         activePage: value
    //     });
    // }

    closeModal() {
        this.setState({
            ...this.state,
            showModal: false
        });
    }

    openModal() {
        console.log('open');
        this.setState({ showModal: true });
    }
    closeModalLogin() {
        this.setState({ showModalLogin: false });
    }

    openModalLogin() {
        console.log('open');
        this.setState({ showModalLogin: true });
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
                creditCardNum: this.state.creditCardNumber,
                creditCardFullName: this.state.creditCardName,
            }
            let user = {
                "firstName" : "Manali"
            }
            this.closeModal();
            this.props.loginData(true, user);
            // API.signup(payload)
            //     .then((res) => {
            //         if (res.data.statusCode === 201) {
            //             let user = {
            //                 "firstName" : "Manali"
            //             }
            //             this.closeModal();
            //             this.props.loginData(true, user);
            //             this.setState({
            //                 // isLoggedIn: true,
            //                 // message: res.data.message
            //
            //             });
            //         } else if (res.data.statusCode === 401) {
            //             this.setState({
            //                 isLoggedIn: false,
            //                 message: res.data.message
            //             });
            //         } else if (res.data.statusCode === 500) {
            //             this.setState({
            //                 isLoggedIn: false,
            //                 message: res.data.message
            //             });
            //         } else if(res.data.statusCode === 400) {
            //             this.setState({
            //                 isLoggedIn: false,
            //                 message: res.data.message
            //             });
            //         }
            //     });
            // this.setState({
            //     ...this.state,
            //     message: ''
            // });
        }else{
            this.setState({
                ...this.state,
                message: valid
            });
            event.preventDefault();
        }
    }
    handleUserLogIn = (event) => {
        var valid = Validate.login(this.state);
        if(valid === ''){
            let payload ={
                email: this.state.email,
                password: this.state.password,
            }
            let user = {
                "firstName" : "Manali"
            }
            this.closeModalLogin();
            this.props.loginData(true, user);
            // API.login(payload)
            //     .then((res) => {
            //         if (res.data.statusCode === 201) {
            //             this.setState({
            //                 isLoggedIn: true,
            //                 message: res.data.message
            //             });
            //         } else if (res.data.statusCode === 401) {
            //             this.setState({
            //                 isLoggedIn: false,
            //                 message: res.data.message
            //             });
            //         } else if (res.data.statusCode === 500) {
            //             this.setState({
            //                 isLoggedIn: false,
            //                 message: res.data.message
            //             });
            //         } else if(res.data.statusCode === 400) {
            //             this.setState({
            //                 isLoggedIn: false,
            //                 message: res.data.message
            //             });
            //         }
            //     });
            // this.setState({
            //     ...this.state,
            //     messageDivLogin: ''
            // });
        }else{
            this.setState({
                ...this.state,
                messageDivLogin: valid
            });
            event.preventDefault();
        }
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

        let loginData = this.props.loginDataProp;

        let isLoggedIn =null;
        if(loginData.isLogged === false){
            isLoggedIn = <li><a href="#" onClick={() => {
                            //this.props.history.push("/signup");
                            this.openModal();
                            }}>SignUp</a>
                        </li>
        } else{
            let name = loginData.loginData.firstName;
            isLoggedIn = <li><a>Hello {name}</a>
                        </li>
        }

        let signout =null;
        if(loginData.isLogged === false){
            signout = <li><a href="/#" onClick={() => {
                        // this.props.history.push("/signin");
                        this.openModalLogin();
                    }}>SignIn</a>
                    </li>
        } else{
            let name = loginData.loginData.firstName;
            signout = <li><a href="/#" onClick={() => {
                        // this.props.history.push("/signin");
                        // this.openModalLogin();
                    }}>Logout</a>
                    </li>
        }

        return (
            <div className="container-fluid">
                <header id="main-header">
                    <div className="container">
                        <div className="nav">
                            <div className="row">
                                <div className="col-sm-5">
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
                                <div className="col-sm-3 col-sm-offset-3">
                                    <ul className="slimmenu">
                                        {isLoggedIn}
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
                                    <input type="text" className="form-control" id="inputPassword" placeholder="(222) 222 2222"
                                           value={this.state.phone}
                                           onChange={(event) => {
                                               this.setState({...this.state,phone: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Credit card Number</label>
                                <div className="col-sm-8">
                                    <input type="number" className="form-control"  placeholder="4067123445389032"
                                           value={this.state.creditCardNumber}
                                           onChange={(event) => {
                                               this.setState({...this.state,creditCardNumber: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Credit Card Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" placeholder="JON SMITH"
                                           value={this.state.creditCardName}
                                           onChange={(event) => {
                                               this.setState({...this.state,creditCardName: event.target.value});
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
    console.log("state App", state)
    return{
        loginDataProp : state.loginData
    };
}

// export default withRouter(HomePage);
const homepage = withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
export default homepage;