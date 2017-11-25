/**
 * Created by ManaliJain on 11/23/17.
 */
import React, {Component} from 'react';
import * as API from '../api/userLogin';
import {loginData} from '../actions/index';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import * as Validate from '../validation/signupValidation';
class UpdateUser extends Component{
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
            firstName: (loginData)? loginData.firstName : '',
            lastName: (loginData)? loginData.lastName : '',
            email: (loginData)? loginData.email : '',
            password: (loginData)? loginData.password : '',
            address : (loginData)? loginData.address : '',
            city : (loginData)? loginData.city : '',
            state : (loginData)? loginData.state : '',
            zipcode : (loginData)? loginData.zipcode : '',
            phone : (loginData)? loginData.phone : '',
            creditCardNumber : (loginData)? loginData.creditCardNumber : '',
            creditCardName : (loginData)? loginData.creditCardName : '',
            messagediv : ''
        }
    }
    componentWillMount(){

            document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "lightgrey";
        // $("#devicelayout").css("property", "value")
        // $("#main-header").css("backgroundColor", "black");
    }

    componentDidMount() {
        if (localStorage.getItem('user_token') === null) {
            this.props.history.push('/');
        }

        // this.props.signInErrorClear();
        // this.props.signUpSuccessClear();
    }

    handleUpadateUser=(event) => {
        let valid = Validate.update(this.state);
        if (valid === '') {
            let loginData = this.props.loginDataProp;
            this.setState({
                // ...this.state,
                // "_id": loginData._id,
                // "id": loginData.id,
                // "uuid": loginData.uuid
            }, this.callAPI);
        } else {
            this.setState({
                ...this.state,
                messagediv: valid
            });
            event.preventDefault();
        }
    }

    callAPI = () => {
        // API.saveAbout(this.state)
        //     .then((res) => {
        //         if (res.data.statusCode === 201) {
        //             this.setState({
        //                 isLoggedIn: true,
        //                 message: res.data.message
        //             });
        //             let overview ={
        //                 "work": this.state.work,
        //                 "education":this.state.education,
        //                 "phone":this.state.phone,
        //                 "events": this.state.events
        //             }
        //             this.props.aboutUpdate(JSON.stringify(overview));
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
        //         } else if (res.data.statusCode === 601  || res.data.statusCode === 600) {
        //             alert("Token expired or invalid. Please login again");
        //             this.setState({
        //                 isLoggedIn: false,
        //                 message: res.data.message
        //             });
        //             sessionStorage.removeItem("jwtToken");
        //             this.props.loginState(false);
        //         }
        //     });
    };

    render() {
        // let loginData = this.props.loginDataProp;
        // let name = loginData.firstname  + " " + loginData.lastname;
        let message =null;
        if(this.state.messagediv !== ''){
            message = <div className="clearfix">
                <div className="alert alert-danger text-center" role="alert">{this.state.messagediv}</div>
            </div>;
        } else{
            message = <div></div>;
        }
        return(
            <div className="bg-front full-center" >
                <div className="container">

                <div className="row justify-content-md-center">
                    <div className="row">
                        {message}
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-offset-5 col-form-label">
                            Update your Data
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control"
                                   value={this.state.firstName}
                                   onChange={(event) => {
                                       this.setState({...this.state,firstName: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control"
                                   value={this.state.lastName}
                                   onChange={(event) => {
                                       this.setState({...this.state,lastName: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label">Email</label>
                        <div className=" col-sm-5">
                            <input type="text"  className="form-control"
                                   value={this.state.email} readonly
                                   />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-5">
                            <input type="password" className="form-control" placeholder="Update Your Password"
                                   value={this.state.password}
                                   onChange={(event) => {
                                       this.setState({...this.state,password: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control"
                                   value={this.state.address}
                                   onChange={(event) => {
                                       this.setState({...this.state,address: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label">City</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="inputPassword"
                                   value={this.state.city}
                                   onChange={(event) => {
                                       this.setState({...this.state,city: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label">State</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="inputPassword"
                                   value={this.state.state}
                                   onChange={(event) => {
                                       this.setState({...this.state,state: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label">Zip Code</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control"
                                   value={this.state.zipcode}
                                   onChange={(event) => {
                                       this.setState({...this.state,zipcode: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label">Phone</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="inputPassword"
                                   value={this.state.phone}
                                   onChange={(event) => {
                                       this.setState({...this.state,phone: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label">Credit card Number</label>
                        <div className="col-sm-5">
                            <input type="number" className="form-control"
                                   value={this.state.creditCardNumber}
                                   onChange={(event) => {
                                       this.setState({...this.state,creditCardNumber: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label">Credit Card Name</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control"
                                   value={this.state.creditCardName}
                                   onChange={(event) => {
                                       this.setState({...this.state,creditCardName: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-offset-2 col-sm-2"> </div>
                        <div className="col-sm-5">
                            <Button  type="button" className = "btn-btn-primary" onClick={this.handleUpadateUser}>Update</Button>
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

// export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);

const UpdateUserPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateUser));
export default UpdateUserPage;