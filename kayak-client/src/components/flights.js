/**
 * Created by ManaliJain on 11/17/17.
 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {flightsData} from '../actions/index';
import {flightFilterData} from '../actions/index';
import * as Validate from '../validation/signupValidation';
import * as API from '../api/searchListings';

class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "flightTripSelection": 'one',
            destination: "",
            source: "",
            departureDate: "",
            arrivalDate: "",
            classType: "Economy",
            seats: 1,
            message: ''
        }
    }

    flightTabCLick = (selection) => {
        this.setState({
            "flightTripSelection": selection
        });
    }

    isFLightTabActive = (value) => {
        // return 'btn '+((value===this.state.selection) ?'active':'default');
        return "tab-pane fade " + ((value === this.state.flightTripSelection) ? 'in active' : 'default');
    }

    isFlightTripActive = (value) => {
        return ((value === this.state.flightTripSelection) ? 'active' : '');
    }

    handleFlightSearch = (event) => {
        var valid = Validate.carSearch(this.state);
        console.log("flight state is", this.state);
        if (valid === '') {
            let payload = {
                destination: this.state.destination,
                source: this.state.source,
                departureDate: this.state.departureDate,
                arrivalDate: this.state.arrivalDate,
                classType: this.state.classType,
                seats: this.state.seats
            }
            this.callForFlightSearch(payload);
        } else {
            this.setState({
                ...this.state,
                message: valid
            });
            event.preventDefault();
        }
    }

    callForFlightSearch = (payload) => {
        API.getFlightList(payload)
            .then((res) => {
                if (res.data.length > 0) {
                    console.log('axiosSignIn', res);
                    this.props.flightsData(res.data, payload);
                    let fligthFilteredData = res.data;
                    fligthFilteredData = fligthFilteredData.filter(flight => flight.class.toLowerCase() === payload.classType.toLowerCase()) ;
                    // this.props.flightFilterData(res.data);
                    this.props.flightFilterData(fligthFilteredData);
                    this.setState({
                        ...this.state,
                        message: ''
                    });
                    let flights = this.props.flightDataProps;
                    console.log("flight response in teh redux is ", flights);
                    this.props.history.push("/flights/search");
                } else {
                    this.setState({
                        ...this.state,
                        message: 'No Flight listings available for the selected search criteria. Try again with another location'
                    });
                }
            }).catch((err) => {
            this.setState({
                ...this.state,
                message: "No Flight listings available for the selected search criteria. Try again with another location"
            });
        })
    }
    
    render() {
        return (
            <div>
                <div className="nav">
                    <ul className="slimmenu-flight">
                        <li className={this.isFlightTripActive('one')}><a onClick={() => this.flightTabCLick('one')}>One
                            Way</a>
                        </li>
                        <li className={this.isFlightTripActive('round')}><a
                            onClick={() => this.flightTabCLick('round')}>Round Trip</a>
                        </li>

                    </ul>
                    <div className="tab-content">
                        <div className={this.isFLightTabActive('round')} id="flight-search-1">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group form-group-lg form-group-icon-left">
                                                <label>From</label>
                                                <input className="typeahead form-control" placeholder="From where?"
                                                       type="text"
                                                       value={this.state.source}
                                                       onChange={(event) => {
                                                           this.setState({
                                                               ...this.state,
                                                               source: event.target.value
                                                           });
                                                       }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group form-group-lg form-group-icon-left">
                                                <label>To</label>
                                                <input className="typeahead form-control" placeholder="To where?"
                                                       type="text"
                                                       value={this.state.destination}
                                                       onChange={(event) => {
                                                           this.setState({
                                                               ...this.state,
                                                               destination: event.target.value
                                                           });
                                                       }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="input-daterange" data-date-format="M d, D">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group form-group-lg form-group-icon-left">
                                                    <label>Departure</label>
                                                    <input className="form-control" type="date" name="start"
                                                           value={this.state.departureDate}
                                                           onChange={(event) => {

                                                               this.setState({
                                                                   ...this.state,
                                                                   departureDate: event.target.value
                                                               });
                                                           }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group form-group-lg form-group-icon-left">
                                                    <label>Arrival</label>
                                                    <input className="form-control" name="end" type="date"
                                                           value={this.state.arrivalDate}
                                                           onChange={(event) => {
                                                               this.setState({
                                                                   ...this.state,
                                                                   arrivalDate: event.target.value
                                                               });
                                                           }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group form-group-lg form-group-select-plus">
                                                    <label>Passengers</label>
                                                    <select className="form-control"
                                                            value={this.state.seats}
                                                            onChange={(event) => {
                                                                this.setState({
                                                                    ...this.state,
                                                                    seats: event.target.value
                                                                })
                                                            }}>
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
                                                <div className="form-group form-group-lg form-group-select-plus">
                                                    <label>Class</label>
                                                    <select className="form-control"
                                                            value={this.state.classType}
                                                            onChange={(event) => {
                                                                this.setState({
                                                                    ...this.state,
                                                                    classType: event.target.value
                                                                })
                                                            }}>
                                                        <option value="Economy">Economy</option>
                                                        <option value="Business">Business</option>
                                                        <option value="First">First</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={this.isFLightTabActive('one')} id="flight-search-2">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group form-group-lg form-group-icon-left">
                                                <label>From</label>
                                                <input className="typeahead form-control" placeholder="From where?"
                                                       type="text"
                                                       value={this.state.source}
                                                       onChange={(event) => {
                                                           this.setState({
                                                               ...this.state,
                                                               source: event.target.value
                                                           });
                                                       }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group form-group-lg form-group-icon-left">
                                                <label>To</label>
                                                <input className="typeahead form-control" placeholder="To where?"
                                                       type="text"
                                                       value={this.state.destination}
                                                       onChange={(event) => {
                                                           this.setState({
                                                               ...this.state,
                                                               destination: event.target.value
                                                           });
                                                       }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-daterange" data-date-format="M d, D">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="form-group form-group-lg form-group-icon-left">
                                                    <label>Departing</label>
                                                    <input className="form-control" type="date" name="start"
                                                           value={this.state.departureDate}
                                                           onChange={(event) => {
                                                               this.setState({
                                                                   ...this.state,
                                                                   departureDate: event.target.value
                                                               });
                                                           }}/>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group form-group-lg form-group-select-plus">
                                                    <label>Passengers</label>
                                                    <select className="form-control " value={this.state.seats}
                                                            onChange={(event) => {
                                                                this.setState({
                                                                    ...this.state,
                                                                    seats: event.target.value
                                                                })
                                                            }}>
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
                                            <div className="col-md-3">
                                                <div className="form-group form-group-lg form-group-select-plus">
                                                    <label>Class</label>
                                                    <select className="form-control" value={this.state.classType}
                                                            onChange={(event) => {
                                                                this.setState({
                                                                    ...this.state,
                                                                    classType: event.target.value
                                                                })
                                                            }}>
                                                        <option value="Economy">Economy</option>
                                                        <option value="Business">Business</option>
                                                        <option value="First">First</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn-lg btn-search" type="submit" onClick={() => this.handleFlightSearch()}>Search for
                    Flights -->
                </button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        flightsData: (data, payload) => dispatch(flightsData(data, payload)),
        flightFilterData: (data) => dispatch(flightFilterData(data))
    };
}

function mapStateToProps(state) {
    console.log("state App", state);
    return {
        flightDataProps: state.flightsData,
        flightFilteredData: state.flightFilteredData
    };
}

const FlightsSearch = withRouter(connect(mapStateToProps, mapDispatchToProps)(Flights));
export default FlightsSearch;