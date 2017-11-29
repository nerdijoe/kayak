/**
 * Created by ManaliJain on 11/23/17.
 */
import React, {Component} from 'react';
import {loginData} from '../actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';
import * as Validate from '../validation/signupValidation';
import * as API from '../api/bookings';
class BookingPage extends Component{
    constructor(props) {
        super(props);
        // let loginData = this.props.loginDataProp;
        let userLoginData = localStorage.getItem('user_login_data');
        let loginData = null;
        if(userLoginData !== null)
        {
            loginData = JSON.parse(userLoginData);
        }
        this.state = {
            creditCardNum : (loginData)? loginData.creditCardNum:'',
            creditCardFullName: '',
            cvv: '',
            expiry: '',
            place : "san jose",
            pickup: '10/12/1748',
            dropoff : '10/12/1748',
            passengers : '3',
            type: 'Sedan',
            pickupAddress : 'hfudfhdukjba dyuieyte yfe8feqf te7iw8efeg7 fe7tfef',
            showModalError: false,
            showModalSuccess: false,
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

    checkLoginStatus() {
        if (localStorage.getItem('user_token') === null) {
            this.openModalError();
            setTimeout(function(){
                this.props.history.push('/');
            },1000);
        }
        // this.props.signInErrorClear();
        // this.props.signUpSuccessClear();
    }

    handleMakePayment=(event) => {
        if (localStorage.getItem('user_token') === null) {
            this.openModalError();
            // setTimeout(function(){
            //     this.props.router.push('/');
            // },5000);
            // this.props.router.push('/');
        } else {
            let valid = Validate.makePayment(this.state);
            if (valid === '') {
                let userToken = localStorage.getItem('user_token');
                let payload = {
                    carId : '5a18e99687b87a6cdac98a0b',
                    startDate : '11/20/2017',
                    endDate : '11/20/2017'
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
                                    <div className="alert alert-info text-center" role="alert">You first need to signin before Making payment... Redirecting to Homepage</div>
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
                            <div className="row row-wrap">
                                <div className="form-group row">
                                    <div className="row">
                                        {message}
                                    </div>

                                    <div className=" text-center col-form-label labelColor">
                                        <h5 className = "labelHeadings"> Your Booking Page </h5>
                                    </div>
                                </div>
                                <div className = "col-sm-offset-1 col-sm-4 bookItem">
                                    <h4 className = "labelHeadings"> Your Booking Details </h4>
                                    <br/>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label labelColorBooking">Place :</label>
                                        <div className="col-sm-6">
                                            <label className="col-form-label labelColorBooking">{this.state.place}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label labelColorBooking">Drop off :</label>
                                        <div className="col-sm-6">
                                            <label className="col-form-label labelColorBooking">{this.state.dropoff}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label labelColorBooking">Passesngers :</label>
                                        <div className="col-sm-6">
                                            <label className="col-form-label labelColorBooking">{this.state.passengers}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label labelColorBooking">Type :</label>
                                        <div className="col-sm-6">
                                            <label className="col-form-label labelColorBooking">{this.state.type}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label labelColorBooking">Pick up address :</label>
                                        <div className="col-sm-6">
                                            <label className="col-form-label labelColorBooking">{this.state.pickupAddress}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className = "col-sm-offset-1 col-sm-6">
                                    <div className="row row-wrap">
                                        <h4 className = "labelHeadings">Pay via Credit/Debit Card</h4>
                                        <br/>
                                            <div className="clearfix">
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
                                    {/*<div className="form-group row">*/}
                                        {/*<div className="col-sm-offset-2 col-sm-2"> </div>*/}
                                        {/*<div className="col-sm-6">*/}
                                            {/*<Button  type="button" className = "btn-btn-primary" onClick={this.handleUpadateUser}>Update</Button>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>

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

const bookingPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingPage));
export default bookingPage;