/**
 * Created by ManaliJain on 11/18/17.
 */
import React,{Component} from 'react';
import {hotelsData} from "../actions/index";
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import * as Validate from '../validation/signupValidation';
import * as API from '../api/searchListings';
import {hotelFilterData} from "../actions/index";

class Hotels extends Component{
    constructor(props) {
        super(props)
        this.state = {
            place: '',
            startDate: '',
            endDate: '',
            guests: '1',
            rooms:'1',
            message: ''
        };
    }

    handleHotelSearch = (event) => {
        var valid = Validate.hotelSearch(this.state);
        console.log("car state is", this.state);
        if(valid === ''){
            let startDateSplit = this.state.startDate.split("-");
            let endDateSplit = this.state.endDate.split("-");
            let startDate = startDateSplit[1] + "/" + startDateSplit[2] + "/" + startDateSplit[0];
            let endDate = endDateSplit[1] + "/" + endDateSplit[2] + "/" + endDateSplit[0];
            let payload ={
                place: this.state.place,
                startDate: startDate,
                endDate: endDate,
                guests: this.state.guests,
                rooms: this.state.rooms
            }
            console.log('hotel payload is manali',payload);
            this.callForHotelSearch(payload);
        }else{
            this.setState({
                ...this.state,
                message: valid
            });
            event.preventDefault();
        }
    }

    callForHotelSearch = (payload) => {
        API.getHotelList(payload)
            .then((res) => {
                if(res.data.length>0){
                    console.log('axioshotels', res);
                    this.props.hotelsData(res.data, payload);
                    this.props.hotelFilterData(res.data);
                    this.setState({
                        ...this.state,
                        message: ''
                    });
                    var hotels = this.props.hotelsDataProp;
                    console.log("hotels response in the redux is ", hotels.hotelSearch);
                    this.props.history.push("/hotels/search");
                } else {
                    this.setState({
                        ...this.state,
                        message: 'No Hotels listings available for the selected search criteria. Try again for another place'
                    });
                }
            }).catch((err) => {
            this.setState({
                ...this.state,
                message: "No Hotels listings available for the selected search criteria. Try again for another place"
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
                        <div className="row hotels">
                            <div className="col-md-3">
                                <div className="form-group form-group-lg form-group-icon-left">
                                    <label>Where are you going?</label>
                                    <input className="typeahead form-control" placeholder="Where" type="text"
                                           value={this.state.place} onChange={(event) => {
                                               this.setState({...this.state, place: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="input-daterange" data-date-format="M d, D">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group form-group-lg form-group-icon-left">
                                                <label>Check-in</label>
                                                <input className="form-control" name="start" type="date" min="2017-12-04"
                                                       value={this.state.startDate} onChange={(event) => {
                                                    this.setState({...this.state, startDate: event.target.value});
                                                }}required/>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group form-group-lg form-group-icon-left">
                                                <label>Check-out</label>
                                                <input className="form-control" name="end" type="date"
                                                       value={this.state.endDate} onChange={(event) => {
                                                    this.setState({...this.state, endDate: event.target.value});
                                                }}required/>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="form-group form-group-lg form-group-select-plus">
                                                <label>Rooms</label>
                                                <select className="form-control" onChange={(event) => {
                                                    this.setState({...this.state, rooms: event.target.value});
                                                }}required>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>4</option>
                                                    <option value='5'>5</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="form-group form-group-lg form-group-select-plus">
                                                <label>Guests</label>
                                                <select className="form-control" onChange={(event) => {
                                                    this.setState({...this.state, guests: event.target.value});
                                                }}required>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>4</option>
                                                    <option value='5'>5</option>
                                                    <option value='6'>6</option>
                                                    <option value='7'>7</option>
                                                    <option value='8'>8</option>
                                                    <option value='9'>9</option>
                                                    <option value='10'>10</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="hotel-search-button">
                                            <button id="pQ6O-submit" className="Common-Widgets-Button-ButtonDeprecated Common-Widgets-Button-Button Button-Gradient size-l searchButton"
                                                    type="submit" aria-label="Search" onClick={this.handleHotelSearch}>
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
        hotelsData: (data, payload) => dispatch(hotelsData(data,payload)),
        hotelFilterData:(data) => dispatch(hotelFilterData(data))
    };
}

function mapStateToProps(state) {
    console.log("state App", state);
    return{
        hotelsDataProp : state.hotelsData
    };
}

const hotels = withRouter(connect(mapStateToProps, mapDispatchToProps)(Hotels));
export default hotels;