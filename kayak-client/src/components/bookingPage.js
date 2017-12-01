/**
 * Created by ManaliJain on 11/23/17.
 */
import React, {Component} from 'react';
import {loginData,bookingSelected,carsData} from '../actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';
import * as Validate from '../validation/signupValidation';
import * as API from '../api/bookings';
import CarBooking from './carBooking';

class BookingPage extends Component{
    constructor(props) {
        super(props);
        let userLoginData = localStorage.getItem('user_login_data');
        let loginData = null;
        if(userLoginData !== null)
        {
            loginData = JSON.parse(userLoginData);
        }
        this.state = {
            creditCardNum : (loginData)? loginData.creditCardNum:'',
            creditCardFullName: (loginData)? loginData.creditCardFullName:'',
            cvv: '',
            expiry: '',
            messagediv : ''
        }
        this.openModalError = this.openModalError.bind(this);
        this.closeModalError = this.closeModalError.bind(this);
        this.openModalBillingSuccess = this.openModalBillingSuccess.bind(this);
        this.closeModalBillingSuccess = this.closeModalBillingSuccess.bind(this);
    }

    closeModalError() {
        this.setState({
            ...this.state,
            showModalError: false
        });
    }
    openModalError() {
        this.setState({ showModalError: true });
    }

    openModalBillingSuccess() {
        this.setState({ showModalSuccess: true });
    }

    closeModalBillingSuccess() {
        this.setState({ showModalSuccess: true });
        this.props.history.push('/');
    }


    handleMakePayment=(event) => {
        if (localStorage.getItem('user_token') === null) {
            this.openModalError();
        } else {
            let valid = Validate.makePayment(this.state);
            if (valid === '') {
                let bookingSelected = this.props.bookingSelectedProp;
                let carsData = this.props.carsDataProp;
                let userToken = localStorage.getItem('user_token');
                let payload = {
                    carId : bookingSelected.carSelected._id,
                    startDate : carsData.searchParams.startDate,
                    endDate : carsData.searchParams.endDate
                }
                this.callAPIForBilling(payload,userToken);
            } else {
                this.setState({
                    ...this.state,
                    messagediv: valid
                });
                event.preventDefault();
            }
        }
    }

    callAPIForBilling = (payload,userToken) => {
        API.makeCarBooking(payload,userToken)
            .then((res) => {
            console.log(res);
            console.log("billing response came",res);
                if(res.data !== null){
                    this.openModalBillingSuccess();
                    this.setState({
                        ...this.state,
                        messagediv: ''
                    });
                } else {
                    this.setState({
                        ...this.state,
                        messagediv: "Payment was not successful... try again"
                    });
                }
            }).catch( (error) => {
            this.setState({
                ...this.state,
                messagediv: "Payment was not successful... try again"
            });
        })
    };

    render() {
        let message =null;
        if(this.state.messagediv !== ''){
            message = <div className="clearfix">
                <div className="alert alert-info text-center" role="alert">{this.state.messagediv}</div>
            </div>;
        } else{
            message = <div></div>;
        }

        let bookingSelected = this.props.bookingSelectedProp;
        if(bookingSelected.bookingFlag !== "" ){
            let switchBookingDecision = null;
            if(bookingSelected.bookingFlag === "C"){
                let carsData = this.props.carsDataProp;
                // let carSelected = null;
                switchBookingDecision = <CarBooking carsData = {carsData} carSelected = {bookingSelected.carSelected} />
            }
            if(bookingSelected.bookingFlag === "F"){
                // switchBookingDecision = <FlightBooking/>
            }
            if(bookingSelected.bookingFlag === "H"){
                // switchBookingDecision = <HotelBooking/>
            }
            // let userLoginData = localStorage.getItem('user_login_data');
            // let loginData = null;
            // if(userLoginData !== null)
            // {
            //     loginData = JSON.parse(userLoginData);
            // }

            return(
                <div>
                    <Modal show={this.state.showModalError} onHide={() => this.closeModalError()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Login required</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row justify-content-md-center">
                                <div className="form-group row">
                                    <div className="col-sm-offset-1 col-sm-10 col-sm-offset-1">
                                        <div className="alert alert-info text-center" role="alert">You first need to signin before Making payment... Click Signin above</div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.closeModalError()}>Close</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showModalSuccess} onHide={() => this.closeModalBillingSuccess()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Payment Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row justify-content-md-center">
                                <div className="form-group row">
                                    <div className="col-sm-offset-1 col-sm-10 col-sm-offset-1">
                                        <div className="alert alert-success text-center" role="alert">You have successfully booked your item</div>
                                    </div>
                                </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.closeModalBillingSuccess()}>Close</Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="bg-front full-center" >
                        <div className="container">
                            <div className="col-md-12">
                                <div className="row row-wrap bookItem">
                                    <div className="form-group row">
                                        <div className="row">
                                            {message}
                                        </div>
                                        <div className=" text-center col-form-label labelColor">
                                            <h5 className = "labelHeadings"> Your Booking Page </h5>
                                        </div>
                                    </div>
                                    {switchBookingDecision}
                                    <div className = "col-sm-offset-1 col-sm-6">
                                        <div className="row row-wrap">
                                            <h4 className = "labelHeadings">Pay via Credit/Debit Card</h4>
                                            <br/>
                                            <div className="row row-wrap">
                                                <div className = "col-sm-2">
                                                    <img src="http://localhost:3000/image/mastercard-curved-64px.png" />
                                                </div>
                                                <div className = "col-sm-2">
                                                    <img src="http://localhost:3000/image/american-express-curved-128px.png" />
                                                </div>
                                                <div className = "col-sm-2">
                                                    <img src="http://localhost:3000/image/maestro-curved-128px.png" />
                                                </div>
                                                <div className = "col-sm-2">
                                                    <img src="http://localhost:3000/image/discover-curved-128px.png" />
                                                </div>
                                                <div className = "col-sm-3">
                                                    <img src="http://localhost:3000/image/paypal.png" />
                                                </div>
                                            </div>
                                            <div className="paymentOptions">
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label labelColorBooking">Card Number</label>
                                                    <div className="col-sm-6">
                                                        <input type="number" className="form-control"
                                                               value={this.state.creditCardNum}
                                                               onChange={(event) => {
                                                                   this.setState({...this.state,creditCardNum: event.target.value});
                                                               }}required/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label labelColorBooking">Cardholder Name</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" className="form-control"
                                                               value={this.state.creditCardFullName}
                                                               onChange={(event) => {
                                                                   this.setState({...this.state,creditCardFullName: event.target.value});
                                                               }}required/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label labelColorBooking">CVC</label>
                                                    <div className="col-sm-2">
                                                        <input type="number" className="form-control" placeholder="xxx"
                                                               value={this.state.cvv}
                                                               onChange={(event) => {
                                                                   this.setState({...this.state,cvv: event.target.value});
                                                               }}required/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label labelColorBooking">Valid Through</label>
                                                    <div className="col-sm-3">
                                                        {/*<input type="text" className="form-control" placeholder="mm/yy"*/}
                                                        {/*value={this.state.expiry}*/}
                                                        {/*onChange={(event) => {*/}
                                                        {/*this.setState({...this.state,expiry: event.target.value});*/}
                                                        {/*}}required/>*/}
                                                        <select className="">
                                                            <option value='1'>01</option>
                                                            <option value='2'>02</option>
                                                            <option value='3'>03</option>
                                                            <option value='4'>04</option>
                                                            <option value='5'>05</option>
                                                            <option value='6'>06</option>
                                                            <option value='7'>07</option>
                                                            <option value='8'>08</option>
                                                            <option value='9'>09</option>
                                                            <option value='5'>10</option>
                                                            <option value='5'>11</option>
                                                            <option value='5'>12</option>
                                                        </select>
                                                        <select className="">
                                                            <option value='1'>2017</option>
                                                            <option value='2'>2018</option>
                                                            <option value='3'>2019</option>
                                                            <option value='4'>2020</option>
                                                            <option value='5'>2021</option>
                                                            <option value='5'>2022</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <button  type="button" className = "btn-btn-book" onClick={this.handleMakePayment}>Make Payment</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            );
        } else {
            return(
                <div className="bg-front">
                    <div className="container">
                        <div className="row col-md-12">
                            <div className="row justify-content-md col-md-offset-1 col-md-8">
                                <h2 className="no-data-found">You first login and select an item to book</h2>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loginData: (data) => dispatch(loginData(data)),
        bookingSelected: (data) => dispatch(bookingSelected(data)),
        carsData: (data) => dispatch(carsData(data))
    };
}

function mapStateToProps(state) {
    return{
        loginDataProp : state.loginData,
        bookingSelectedProp : state.bookingSelected,
        carsDataProp : state.carsData
    };
}

const bookingPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingPage));
export default bookingPage;