/**
 * Created by ManaliJain on 11/17/17.
 */
import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {carsData} from '../actions/index';
import {carFilterData} from '../actions/index';
import * as Validate from '../validation/signupValidation';
import * as API from '../api/searchListings';

class Cars extends Component{
    constructor(props) {
        super(props)
        this.state = {
            location: '',
            startDate: '',
            endDate: '',
            message: ''
        };
    }

    handleCarSearch = (event) => {
        var valid = Validate.carSearch(this.state);
        console.log("car state is", this.state);
        if(valid === ''){
            let payload ={
                location: this.state.location,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
            }
            this.callForCarSearch(payload);
        }else{
            this.setState({
                ...this.state,
                message: valid
            });
            event.preventDefault();
        }
    }

    callForCarSearch = (payload) => {
        API.getCarList(payload)
            .then((res) => {
                if(res.data.length>0){
                    console.log('axiosSignIn', res);
                    this.props.carsData(res.data, payload);
                    this.props.carFilterData(res.data);
                    this.setState({
                        ...this.state,
                        message: ''
                    });
                    var cars = this.props.carsDataProp;
                    console.log("cars response in teh redux is ", cars);
                    this.props.history.push("/cars/search")
                } else {
                    this.setState({
                        ...this.state,
                        message: 'No Car listings available for the selected search criteria. Try again with another location'
                    });
                }
            }).catch((err) => {
            this.setState({
                ...this.state,
                message: "No Car listings available for the selected search criteria. Try again with another location"
            });
        })
    }
    render(){
        let messagediv =null;
        if(this.state.message !== ''){
            messagediv = <div className="clearfix">
                <div className="alert alert-info text-center" role="alert">{this.state.message}</div>
            </div>;
        } else{
            messagediv = <div></div>;
        }
        return(
            <div>
                {messagediv}
                <div className="tab-pane">
                        <div className="row cars">
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group form-group-lg form-group-icon-left">
                                            <label>Where are you going?</label>
                                            <input className="typeahead form-control" placeholder="Where" type="text"
                                                   value={this.state.location}
                                                   onChange={(event) => {
                                                       this.setState({...this.state,location: event.target.value});
                                                   }}required/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="input-daterange" data-date-format="M d, D">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="form-group form-group-lg form-group-icon-left">
                                                <label>Pick-up Date</label>
                                                <input className="form-control" name="start" type="date" min="2017-12-04" value={this.state.startDate}
                                                       onChange={(event) => {
                                                           this.setState({...this.state,startDate: event.target.value});
                                                       }}required/>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="form-group form-group-lg form-group-icon-left">
                                                <label>Drop-off Date</label>
                                                <input className="form-control" name="end" type="date" min="2017-12-04" value={this.state.endDate}
                                                       onChange={(event) => {
                                                           this.setState({...this.state,endDate: event.target.value});
                                                       }}required/>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="hotel-search-button">
                                                <button id="pQ6O-submit" className="Common-Widgets-Button-ButtonDeprecated Common-Widgets-Button-Button Button-Gradient size-l searchButton"
                                                        type="submit" aria-label="Search" onClick={this.handleCarSearch}>
                                                    <span className="v-c-p centre">
                                                    <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"><path d="M31.88 12.32l-1.43 1.4L39.56 23H20v2h19.56l-9.11 9.27 1.43 1.41L43.35 24 31.88 12.32M11 23h6v2h-6zM5 23h3v2H5z"></path></svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        carsData: (data, payload) => dispatch(carsData(data, payload)),
        carFilterData:(data) => dispatch(carFilterData(data))
    };
}

function mapStateToProps(state) {
    console.log("state App", state);
    return{
        carsDataProp : state.carsData
    };
}

const cars = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cars));
export default cars;