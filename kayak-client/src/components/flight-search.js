import React, {Component} from 'react';
import FlightSearchList from './flight-search-list';
import FlightFilter from './flight-search-filter';
import {connect} from 'react-redux';
import {filterData} from '../actions/index';
import {bindActionCreators} from 'redux';

class FlightSearch extends Component {
    constructor(props) {
        super(props);
        /*this.state = {
            flightDetails: [
                {
                    airlines: "delta",
                    flightNumber: 1234,
                    departTime: "12h 30m ",
                    arrivalTime: "22h 10m",
                    departureDate: "Wed, Mar 23 2017",
                    arrivalDate: "Wed, Mar 23 2017",
                    origin: "Delhi, India",
                    destination: "Mumbai, India",
                    // imageURL: "../img/delta.jpg",
                    imageURL: "http://localhost:3000/image/delta.jpg",
                    flightDuration: "9h 40m",
                    class: "economy",
                    price:120
                },
                {
                    airlines: "air canade",
                    flightNumber: 1233,
                    departTime: "12h 30m ",
                    arrivalTime: "22h 10m",
                    departureDate: "Wed, Mar 23 2017",
                    arrivalDate: "Wed, Mar 23 2017",
                    origin: "Delhi, India",
                    destination: "Mumbai, India",
                    // imageURL: "../img/aircanada.jpg",
                    imageURL: "http://localhost:3000/image/aircanada.jpg",
                    flightDuration: "21 hours",
                    class: "economy",
                    price:125
                },
                {
                    airlines: "american airlines",
                    flightNumber: 123,
                    departTime: "12h 30m ",
                    arrivalTime: "22h 10m",
                    departureDate: "Wed, Mar 23 2017",
                    arrivalDate: "Wed, Mar 23 2017",
                    origin: "Delhi, India",
                    destination: "Mumbai, India",
                    // imageURL: "./img/american-airlines.jpg",
                    imageURL: "http://localhost:3000/image/american-airlines.jpg",
                    flightDuration: "21 hours",
                    class: "economy",
                    price:130
                },
                {
                    airlines: "air france",
                    flightNumber: 123,
                    departTime: "12h 30m ",
                    arrivalTime: "22h 10m",
                    departureDate: "Wed, Mar 23 2017",
                    arrivalDate: "Wed, Mar 23 2017",
                    origin: "Delhi, India",
                    destination: "Mumbai, India",
                    // imageURL: "../img/american-airlines.jpg",
                    imageURL: "http://localhost:3000/image/airfrance.jpg",
                    flightDuration: "21 hours",
                    class: "business",
                    price:435
                }
            ]
        };*/
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

    // handleFlightBooking = () => {
    //
    // }
    // handleFlightBooking=()=>{
    //     this.props.history.push('/booking');
    //     console.log('insdde booking flight');
    // }
    render() {
        console.log(this.props.filteredData);
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

                                    this.props.flightData.map((flight, index) => {
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