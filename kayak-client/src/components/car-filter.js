import React, {Component} from 'react';
import {connect} from 'react-redux';
import {carFilterData} from '../actions/index';
import {bindActionCreators} from 'redux';

class CarFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceSliderLow: 0,
            priceSliderHigh: 0,
            priceLow: 0,
            priceHigh: 0,
            carTypeFilter: []
        }
        // this.props.filterData(this.props.flightData);
    }

    componentWillMount() {
        let i, low='', max='', carData = this.props.carsData.carSearch;
        for (i = 0; i < carData.length; i++) {
            if (!max || parseInt(carData[i]['price']) > parseInt(max['price']))
                max = carData[i];
        }
        for (i = 0; i < carData.length; i++) {
            if (!low || parseInt(carData[i]['price']) < parseInt(low['price']))
                low = carData[i];
        }
        if (low !== '' && max !== '') {
            this.state = {
                priceSliderLow: low.price,
                priceSliderHigh: max.price,
                priceLow: low.price,
                priceHigh: max.price,
                carTypeFilter: []
            }
        }
        // document.body.style.backgroundImage = "none";
        // this.props.filterData(this.props.flightData);
    }

    applyFilter = () => {
        var carData = this.props.carsData.carSearch;
        var low = this.state.priceSliderLow, high = this.state.priceSliderHigh;
        var carFilteredData = carData.filter(car => car.price >= low & car.price <= high);
        let typeFilter = this.state.carTypeFilter;
        if (typeFilter.length > 0) {
            carFilteredData = carFilteredData.filter(car => typeFilter.indexOf(car.type) > -1);
        }
        this.props.carFilterData(carFilteredData);
    }
    typeModified = (event, typeName) => {
        if (event.target.checked === true) {
            let typeFilter = this.state.carTypeFilter;
            typeFilter.push(typeName);
            this.setState({
                ...this.state,
                carTypeFilter: typeFilter
            })
        }
        else {
            let typeFilter = this.state.carTypeFilter;
            typeFilter.splice(typeFilter.indexOf(typeName), 1);
            this.setState({
                ...this.state,
                carTypeFilter: typeFilter
            })
            console.log(typeFilter);
        }
        this.applyFilter();
    }

    render() {
        return (
            <aside className="booking-filters text-white">
                <h3>Filter By:</h3>
                <ul className="list booking-filters-list">
                    <li>
                        <h5 className="booking-filters-title">Car Type
                        </h5>
                        <div className="checkbox">
                            <label>
                                <input className="i-check filter-checkbox" type="checkbox"
                                       onChange={(event)=>this.typeModified(event,'Sedan')}
                                />Sedan
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"
                                       onChange={(event)=>this.typeModified(event,'SUV')}
                                />SUV
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"
                                       onChange={(event)=>this.typeModified(event,'Van')}
                                />Van
                            </label>
                        </div>
                    </li>
                    <li>
                        <h5 className="booking-filters-title">Price </h5>
                        <h6 className="booking-filters-title">range low </h6>
                        <label>{this.state.priceLow}</label><span className="pull-right">{this.state.priceHigh}</span>
                        <input className="price-slider"
                               id="mySlider"
                               type="range"
                               value={this.state.priceSliderLow}
                               min={this.state.priceLow}
                               max={this.state.priceHigh}
                               onInput={(event) => {
                                   this.setState({
                                       priceSliderLow: event.target.value
                                   });
                                   this.applyFilter();
                               }}
                               step={1}/>
                        Value = {this.state.priceSliderLow}
                        <h6 className="booking-filters-title">range high </h6>
                        <label>{this.state.priceLow}</label><span className="pull-right">{this.state.priceHigh}</span>
                        <input className="price-slider"
                               id="mySlider"
                               type="range"
                               value={this.state.priceSliderHigh}
                               min={this.state.priceLow}
                               max={this.state.priceHigh}
                               onInput={(event) => {
                                   this.setState({
                                       priceSliderHigh: event.target.value
                                   });
                                   this.applyFilter();
                               }}
                               step={1}
                               onmouseup={this.applyFilter}
                        />
                        Value = {this.state.priceSliderHigh}
                    </li>
                </ul>
            </aside>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        carFilterData: carFilterData
    }, dispatch);
}

function mapStateToProps(state) {
    // console.log("state App", state);
    return {
        carsData: state.carsData,
        carFilteredData: state.carFilteredData
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(CarFilter);