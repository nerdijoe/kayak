import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hotelFilterData} from '../actions/index';
import {bindActionCreators} from 'redux';

class CarFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceSliderLow: 0,
            priceSliderHigh: 0,
            priceLow: 0,
            priceHigh: 0,
            hotelStarFilter: []
        }
        // this.props.filterData(this.props.flightData);
    }

    componentWillMount() {
        let i, low = '', max = '', hotelData = this.props.hotelsData.hotelSearch;
        for (i = 0; i < hotelData.length; i++) {
            if (!max || parseInt(hotelData[i]['price']) > parseInt(max['price']))
                max = hotelData[i];
        }
        for (i = 0; i < hotelData.length; i++) {
            if (!low || parseInt(hotelData[i]['price']) < parseInt(low['price']))
                low = hotelData[i];
        }
        if (low !== '' && max !== '') {
            this.state = {
                priceSliderLow: low.price,
                priceSliderHigh: max.price,
                priceLow: low.price,
                priceHigh: max.price,
                hotelStarFilter: []
            }
        }
        else {
            this.state = {
                priceSliderLow: 0,
                priceSliderHigh: 0,
                priceLow: 0,
                priceHigh: 0,
                hotelStarFilter: []
            };
        }
    }

    // document.body.style.backgroundImage = "none";
    // this.props.filterData(this.props.flightData);

    applyFilter = () => {
        var hotelData = this.props.hotelsData.hotelSearch;
        var low = this.state.priceSliderLow, high = this.state.priceSliderHigh;
        var hotelFilteredData = hotelData.filter(hotel => hotel.room.price >= low & hotel.room.price <= high);
        let hotelStarFilter = this.state.carTypeFilter;
        if (hotelStarFilter.length > 0) {
            hotelFilteredData = hotelFilteredData.filter(car => hotelStarFilter.indexOf(car.stars) > -1);
        }
        this.props.carFilterData(hotelFilteredData);
    }
    typeModified = (event, stars) => {
        if (event.target.checked === true) {
            let hotelStarFilter = this.state.hotelStarFilter;
            hotelStarFilter.push(stars);
            this.setState({
                ...this.state,
                hotelStarFilter: hotelStarFilter
            })
        }
        else {
            let hotelStarFilter = this.state.hotelStarFilter;
            hotelStarFilter.splice(hotelStarFilter.indexOf(stars), 1);
            this.setState({
                ...this.state,
                hotelStarFilter: hotelStarFilter
            })
            console.log(hotelStarFilter);
        }
        this.applyFilter();
    }

    render() {
        return (
            <aside className="booking-filters text-white">
                <h3>Filter By:</h3>
                <ul className="list booking-filters-list">
                    <li>
                        <h5 className="booking-filters-title">Star
                        </h5>
                        <div className="checkbox">
                            <label>
                                <input className="i-check filter-checkbox" type="checkbox"
                                       onChange={(event) => this.typeModified(event, 1)}
                                />1 Star
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"
                                       onChange={(event) => this.typeModified(event, 2)}
                                />2 Star
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"
                                       onChange={(event) => this.typeModified(event, 3)}
                                />3 Star
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"
                                       onChange={(event) => this.typeModified(event, 4)}
                                />4 Star
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"
                                       onChange={(event) => this.typeModified(event, 5)}
                                />5 Star
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
        hotelFilterData: hotelFilterData
    }, dispatch);
}

function mapStateToProps(state) {
    // console.log("state App", state);
    return {
        hotelsData: state.hotelsData,
        hotelFilteredData: state.hotelFilteredData
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(CarFilter);