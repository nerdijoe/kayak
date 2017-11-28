import React, {Component} from 'react';
import FlightSearchList from './flight-search-list';
import FlightFilter from './flight-search-filter';
import {connect} from 'react-redux';
import {filterData} from '../actions/index';
import {bindActionCreators} from 'redux';

class CarSearch extends Component {
    constructor(props) {
        super(props);
        this.props.filterData(this.props.flightData);
        console.log("filter data was called");
    }

    /*    componentWillMount() {
            // document.body.style.backgroundImage = "none";
            // document.body.style.backgroundColor = "lightgrey";
            // this.props.filterData(this.props.flightData);
        }
        componentDidMount(){
            // this.props.filterData(this.props.flightData);
        }
        componentWillReceiveProps(){
            // this.props.filterData(this.props.flightData);
        }*/

    render() {
        if (this.props.filteredData.filteredData.length > 0) {
            return (
                <div className="bg-front">
                    <div className="container">
                        <div className="row col-md-12">
                            <div className="col-md-3">
                                <FlightFilter/>
                            </div>
                            <div className="row justify-content-md col-md-offset-1 col-md-8">
                                <ul className="booking-list">
                                    {   //this.state.flightDetails.map

                                        this.props.filteredData.filteredData.map((flight, index) => {
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
        filterData: filterData
    }, dispatch);
}

function mapStateToProps(state) {
    console.log("state App", state);
    return {
        flightData: state.flightData,
        filteredData: state.filteredData
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(FlightSearch);