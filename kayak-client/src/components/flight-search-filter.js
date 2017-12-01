import React, {Component} from 'react';
import {connect} from 'react-redux';
import {flightFilterData} from '../actions/index';
import {bindActionCreators} from 'redux';
class FlightFilter extends Component {
    constructor(props){
        super(props);
        this.state = {
            priceSliderLow:0,
            priceSliderHigh:0,
            departureHourSliderLow:0,
            departureHourSliderHigh:0,
            arrivalHourSliderLow:0,
            arrivalHourSliderHigh:0,
            priceLow:0,
            priceHigh:0,
            hourLow:0,
            hourHigh:0,
            classFilter:[]
        }
    }
    componentWillMount() {
        let i,low ='',max ='', flightsData = this.props.flightsData.flightSearch;
        for ( i=0 ; i<flightsData.length ; i++) {
            if (!max || parseInt(flightsData[i]['price']) > parseInt(max['price']))
                max = flightsData[i];
        }
        for ( i=0 ; i<flightsData.length ; i++) {
            if (!low || parseInt(flightsData[i]['price']) < parseInt(low['price']))
                low = flightsData[i];
        }
        if (low !== '' && max !== '') {
            this.state = {
                priceSliderLow: low.price,
                priceSliderHigh: max.price,
                priceLow: low.price,
                priceHigh: max.price,
                departureHourSliderLow:0,
                departureHourSliderHigh:24,
                arrivalHourSliderLow:0,
                arrivalHourSliderHigh:24,
                classFilter: []
            }
        }
    }
    getDateHours = (date)=>{
        let newDate = new Date(date);
        let hours = newDate.getHours();
        return hours;
    }
    applyFilter = ()=>{
        var flightsData = this.props.flightsData.flightSearch;
        var lowPrice = this.state.priceSliderLow, highPrice = this.state.priceSliderHigh,
            departureHourHigh = this.state.departureHourSliderHigh,departureHourLow = this.state.departureHourSliderLow,
        arrivalHourHigh = this.state.arrivalHourSliderHigh,arrivalHourLow = this.state.arrivalHourSliderLow;
        var filteredFlightData = flightsData.filter(flight=>flight.price>=lowPrice & flight.price<=highPrice);
        // filteredFlightData = filteredFlightData.filter(flight=> new Date(flight.departTime).getHours()>=departureHourLow && new Date(flight.departTime).getHours()<=departureHourHigh);
        // filteredFlightData = filteredFlightData.filter(flight=> new Date(flight.arrivalTime).getHours()>=arrivalHourHigh && new Date(flight.arrivalTime).getHours()<=arrivalHourLow);
        filteredFlightData = filteredFlightData.filter
        (flight=> this.getDateHours(flight.departTime)>=departureHourLow && this.getDateHours(flight.departTime)<=departureHourHigh);
        filteredFlightData = filteredFlightData.filter
        (flight=> this.getDateHours(flight.arrivalTime)>=arrivalHourLow && this.getDateHours(flight.arrivalTime)<=arrivalHourHigh);
        let classFilter = this.state.classFilter;
        if (classFilter.length > 0) {
            filteredFlightData = filteredFlightData.filter(flight => classFilter.indexOf(flight.class.toLowerCase()) > -1);
        }
        console.log(filteredFlightData);
        this.props.flightFilterData(filteredFlightData);
    }
    classModified = (event,className)=>{
        if(event.target.checked === true){
            let classFilter = this.state.classFilter;
            classFilter.push(className);
            this.setState({
                ...this.state,
                classFilter:[classFilter]
            })
        }
        else{
           let classFilter = this.state.classFilter;
            classFilter.splice(classFilter.indexOf(className),1);
            this.setState({
                ...this.state,
                classFilter:classFilter
            })
            console.log(classFilter);
        }
        this.applyFilter();
    }
    render() {
        return (
            <aside className="booking-filters text-white">
                <h3>Filter By:</h3>
                <ul className="list booking-filters-list">
                    {/*<li>
                        <h5 className="booking-filters-title">Departure Time
                        </h5>
                        <div className="checkbox">
                            <label>
                                <input className="i-check filter-checkbox" type="checkbox"/>Departure 12:00 AM to 8:00AM
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"/>Departure 8:00 AM to 4:00PM
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"/>Departure 4:00 PM to 12:00AM
                            </label>
                        </div>
                    </li>*/}
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
                               }}
                               onMouseUp={()=>{this.applyFilter()}}
                               step={1} />
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
                               }}
                               step={1}
                               onMouseUp={()=>{this.applyFilter()}}
                        />
                        Value = {this.state.priceSliderHigh}
                    </li>
                    <li>
                        <h5 className="booking-filters-title">Flight class
                        </h5>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"
                                onChange={(event)=>this.classModified(event,'economy')}/>Economy
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"
                                       onChange={(event)=>this.classModified(event,'business')}
                                />Business
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"
                                onChange={(event)=>this.classModified(event,'first')}
                                />First
                            </label>
                        </div>
                    </li>
                    <li>
                        <h5 className="booking-filters-title">Departure Time </h5>
                        <h6 className="booking-filters-title">Start range </h6>
                        <label>{0}</label><span className="pull-right">{24}</span>
                        <input className="price-slider"
                               id="mySlider"
                               type="range"
                               value={this.state.departureHourSliderLow}
                               min={0}
                               max={24}
                               onInput={(event) => {
                                   this.setState({
                                       departureHourSliderLow: event.target.value
                                   });
                               }}
                               onMouseUp={() => {
                                   this.applyFilter()
                               }}
                               step={1}/>
                        Value = {this.state.departureHourSliderLow}
                        <h6 className="booking-filters-title">End range </h6>
                        <label>{0}</label><span className="pull-right">{24}</span>
                        <input className="price-slider"
                               id="mySlider"
                               type="range"
                               value={this.state.departureHourSliderHigh}
                               min={0}
                               max={24}
                               onInput={(event) => {
                                   this.setState({
                                       departureHourSliderHigh: event.target.value
                                   });
                               }}
                               step={1}
                               onMouseUp={() => {
                                   this.applyFilter()
                               }}
                        />
                        Value = {this.state.departureHourSliderHigh}
                    </li>
                    <li>
                        <h5 className="booking-filters-title">Arrival Time </h5>
                        <h6 className="booking-filters-title">Start range </h6>
                        <label>{0}</label><span className="pull-right">{24}</span>
                        <input className="price-slider"
                               id="mySlider"
                               type="range"
                               value={this.state.arrivalHourSliderLow}
                               min={0}
                               max={24}
                               onInput={(event) => {
                                   this.setState({
                                       arrivalHourSliderLow: event.target.value
                                   });
                               }}
                               onMouseUp={() => {
                                   this.applyFilter()
                               }}
                               step={1}/>
                        Value = {this.state.arrivalHourSliderLow}
                        <h6 className="booking-filters-title">End range </h6>
                        <label>{0}</label><span className="pull-right">{24}</span>
                        <input className="price-slider"
                               id="mySlider"
                               type="range"
                               value={this.state.arrivalHourSliderHigh}
                               min={0}
                               max={24}
                               onInput={(event) => {
                                   this.setState({
                                       arrivalHourSliderHigh: event.target.value
                                   });
                               }}
                               step={1}
                               onMouseUp={() => {
                                   this.applyFilter()
                               }}
                        />
                        Value = {this.state.arrivalHourSliderHigh}
                    </li>
                </ul>
            </aside>
        )
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        flightFilterData:flightFilterData
    },dispatch);
}

function mapStateToProps(state) {
    // console.log("state App", state);
    return{
        flightsData : state.flightsData,
        flightFilteredData: state.flightFilteredData
    };
}

export default connect(mapStateToProps,matchDispatchToProps)(FlightFilter);