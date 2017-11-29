import React, {Component} from 'react';
import CarList from './car-list';
import CarFilter from './car-filter';
import {connect} from 'react-redux';
import {carFilterData} from '../actions/index';
import {bindActionCreators} from 'redux';

class CarSearch extends Component {
    constructor(props) {
        super(props);
        // this.props.filterData(this.props.flightData);
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
        if (this.props.carFilteredData.carFilteredData.length > 0) {
            return (
                <div className="bg-front">
                    <div className="container">
                        <div className="row col-md-12">
                            <div className="col-md-3">
                                <CarFilter/>
                            </div>
                            <div className="col-md-offset-1 col-md-8">
                                <ul className="booking-list">
                                    {   //this.state.flightDetails.map

                                        this.props.carFilteredData.carFilteredData.map((car, index) => {
                                            return (
                                                <CarList
                                                    key={index}
                                                    car={car}
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
                                <CarFilter/>
                            </div>
                            <div className="row justify-content-md col-md-offset-1 col-md-8">
                                <h2 className="no-data-found">No Car found</h2>
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
        carFilterData: carFilterData
    }, dispatch);
}

function mapStateToProps(state) {
    console.log("state App", state);
    return {
        carsData: state.carsData,
        carFilteredData: state.carFilteredData
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(CarSearch);