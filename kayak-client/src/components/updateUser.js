/**
 * Created by ManaliJain on 11/23/17.
 */
import React, {Component} from 'react';
import * as API from '../api/userLogin';
import {loginData} from '../actions/index';
import {connect} from 'react-redux';
import {Button, Modal} from 'react-bootstrap';
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
            profileImage : (loginData)? loginData.profileImage : '',
            creditCardNum : (loginData)? loginData.creditCardNum : '',
            creditCardFullName : (loginData)? loginData.creditCardFullName : '',
            messagediv : '',
            showUpdateModal : false
        }
        this.openUpdateModel = this.openUpdateModel.bind(this);
        this.closeUpdateModel = this.closeUpdateModel.bind(this);
    }

    closeUpdateModel() {
        this.setState({
            ...this.state,
            showUpdateModal: false
        });
    }
    openUpdateModel() {
        this.setState({ showUpdateModal: true });
    }
    componentWillMount(){

        //     document.body.style.backgroundImage = "none";
        // document.body.style.backgroundColor = "lightgrey";
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
            let userLoginData = localStorage.getItem('user_login_data');
            let loginData = null;
            if(userLoginData !== null)
            {
                loginData = JSON.parse(userLoginData);
            }
            let payload = {
                id : loginData.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                address : this.state.address,
                city : this.state.city,
                state : this.state.state,
                zipcode : this.state.zipcode,
                phone : this.state.phone,
                profileImage :  this.state.profileImage,
                creditCardNum : this.state.creditCardNum,
                creditCardFullName : this.state.creditCardFullName
            }
            this.callAPI(payload);
        } else {
            this.setState({
                ...this.state,
                messagediv: valid
            });
            event.preventDefault();
        }
    }

    callAPI = (payload) => {
        API.update(payload)
            .then((res) => {
                if(res.data === true){
                    localStorage.setItem('user_login_data', JSON.stringify(payload));
                    this.props.loginData(true, payload);
                    this.setState({
                        ...this.state,
                        messagediv: ''
                    });
                    this.openUpdateModel()
                } else {
                    this.setState({
                        ...this.state,
                        messagediv: "Update Error Occured, Please try again"
                    });
                }
            }).catch( (error) => {
            this.setState({
                ...this.state,
                messagediv: "Update Error Occured, Please try again"
            });
        })
    };

    render() {
        let message =null;
        if(this.state.messagediv !== ''){
            message = <div className="clearfix">
                <div className="alert alert-danger text-center" role="alert">{this.state.messagediv}</div>
            </div>;
        } else{
            message = <div></div>;
        }
        return(
            <div>
                <Modal show={this.state.showUpdateModal} onHide={() => this.closeUpdateModel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>SignUp Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row justify-content-md-center">
                            <div className="form-group row">
                                <div className="col-sm-offset-1 col-sm-10 col-sm-offset-1">
                                    <div className="alert alert-success text-center" role="alert">Profile updated Successfully</div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.closeUpdateModel()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            <div className="bg-front full-center" >
                <div className="container">

                <div className="row justify-content-md-center">
                    <div className="row">
                        {message}
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-offset-5 col-form-label labelColor">
                            Update your Data
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label labelColor">First Name</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control"
                                   value={this.state.firstName}
                                   onChange={(event) => {
                                       this.setState({...this.state,firstName: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label labelColor">Last Name</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control"
                                   value={this.state.lastName}
                                   onChange={(event) => {
                                       this.setState({...this.state,lastName: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label labelColor">Email</label>
                        <div className=" col-sm-5">
                            <input type="text"  className="form-control"
                                   value={this.state.email} readOnly
                                   />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label labelColor">Password</label>
                        <div className="col-sm-5">
                            <input type="password" className="form-control" placeholder="Update Your Password"
                                   value={this.state.password}
                                   onChange={(event) => {
                                       this.setState({...this.state,password: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label labelColor">Address</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control"
                                   value={this.state.address}
                                   onChange={(event) => {
                                       this.setState({...this.state,address: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label labelColor">City</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="inputPassword"
                                   value={this.state.city}
                                   onChange={(event) => {
                                       this.setState({...this.state,city: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label labelColor">State</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="inputPassword"
                                   value={this.state.state}
                                   onChange={(event) => {
                                       this.setState({...this.state,state: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label labelColor">Zip Code</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control"
                                   value={this.state.zipcode}
                                   onChange={(event) => {
                                       this.setState({...this.state,zipcode: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label labelColor">Phone</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="inputPassword"
                                   value={this.state.phone}
                                   onChange={(event) => {
                                       this.setState({...this.state,phone: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label labelColor">Profile Image URL</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control"  placeholder="Paste your URL"
                                   value={this.state.profileImage}
                                   onChange={(event) => {
                                       this.setState({...this.state,profileImage: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label labelColor">Credit card Number</label>
                        <div className="col-sm-5">
                            <input type="number" className="form-control"
                                   value={this.state.creditCardNum}
                                   onChange={(event) => {
                                       this.setState({...this.state,creditCardNum: event.target.value});
                                   }}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-offset-2 col-sm-2 col-form-label labelColor">Credit Card Name</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control"
                                   value={this.state.creditCardFullName}
                                   onChange={(event) => {
                                       this.setState({...this.state,creditCardFullName: event.target.value});
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

const UpdateUserPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateUser));
export default UpdateUserPage;