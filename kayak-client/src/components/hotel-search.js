import React, {Component} from 'react';
import HotelList from './hotel-list';
import HotelFilter from './hotel-filter';
import {connect} from 'react-redux';
import {hotelFilterData} from '../actions/index';
import {bindActionCreators} from 'redux';

class HotelSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.hotelFilteredData.hotelFilteredData.length > 0) {
            return (
                <div className="bg-front">
                    <div className="container">
                        <div className="row col-md-12">
                            <div className="col-md-3">
                                <HotelFilter/>
                            </div>
                            <div className="col-md-offset-1 col-md-8">
                                <ul className="booking-list">
                                    {   //this.state.flightDetails.map

                                        this.props.hotelFilteredData.hotelFilteredData.map((hotel, index) => {
                                            return (
                                                <HotelList
                                                    key={index}
                                                    hotel={hotel}
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
        else {
            return (
                <div className="bg-front">
                    <div className="container">
                        <div className="row col-md-12">
                            <div className="col-md-3">
                                <HotelFilter/>
                            </div>
                            <div className="row justify-content-md col-md-offset-1 col-md-8">
                                <h2 className="no-data-found">No Hotel found</h2>
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
        hotelFilterData: hotelFilterData
    }, dispatch);
}

function mapStateToProps(state) {
    console.log("state App", state);
    return {
        hotelsData: state.hotelsData,
        hotelFilteredData: state.hotelFilteredData
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(HotelSearch);