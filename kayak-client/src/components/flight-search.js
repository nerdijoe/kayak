import React, {Component} from 'react';
import FlightSearchList from './flight-list';
import FlightFilter from './flight-search-filter';
import {connect} from 'react-redux';
import {flightFilterData} from '../actions/index';
import {bindActionCreators} from 'redux';

class FlightSearch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.flightFilteredData.flightFilteredData.length > 0) {
            return (
                <div className="bg-front">
                    <div className="container">
                        <div className="row col-md-12">
                            <div className="col-md-3">
                                <FlightFilter/>
                            </div>

                            <div className="row justify-content-md col-md-offset-1 col-md-8">
                                <ul className="booking-list">
                                    {
                                        this.props.flightFilteredData.flightFilteredData.map((flight, index) => {
                                            return (
                                                <FlightSearchList
                                                    key={index}
                                                    flight={flight}
                                                />
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="bg-front">
                    <div className="container">
                        <div className="row col-md-12">
                            <div className="col-md-3">
                                <FlightFilter/>
                            </div>
                            <div className="row justify-content-md col-md-offset-1 col-md-8">
                                <h2 className="no-data-found">No Flights found</h2>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        flightFilterData: flightFilterData
    }, dispatch);
}

function mapStateToProps(state) {
    console.log("state App", state);
    return {
        flightsData: state.flightsData,
        flightFilteredData: state.flightFilteredData
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(FlightSearch);