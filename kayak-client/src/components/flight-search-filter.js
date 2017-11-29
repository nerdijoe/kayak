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
            priceLow:0,
            priceHigh:0,
            classFilter:[]
        }
        // this.props.filterData(this.props.flightData);
    }
    componentWillMount() {
        let i,low,max, flightData = this.props.flightData;
        for ( i=0 ; i<flightData.length ; i++) {
            if (!max || parseInt(flightData[i]['price']) > parseInt(max['price']))
                max = flightData[i];
        }
        for ( i=0 ; i<flightData.length ; i++) {
            if (!low || parseInt(flightData[i]['price']) < parseInt(low['price']))
                low = flightData[i];
        }
        this.state = {
            priceSliderLow:low.price,
            priceSliderHigh:max.price,
            priceLow:low.price,
            priceHigh:max.price,

            classFilter:[]
        }
        // document.body.style.backgroundImage = "none";
        // this.props.filterData(this.props.flightData);
    }
    applyFilter = ()=>{
        var flightData = this.props.flightData;
        var low = this.state.priceSliderLow, high = this.state.priceSliderHigh;
        var filteredFlightData = flightData.filter(flight=>flight.price>=low & flight.price<=high);
        let classFilter = this.state.classFilter;
        if (classFilter.length > 0) {
            filteredFlightData = filteredFlightData.filter(flight => classFilter.indexOf(flight.class) > -1);
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
                    <li>
                        <h5 className="booking-filters-title">Stops
                            {/*<small>Price from</small>*/}
                        </h5>
                        <div className="checkbox">
                            <label>
                                <input className="i-check filter-checkbox" type="checkbox"/>Departure 12:00 AM to 8:00AM
                                {/*<span className="pull-right">$215</span>*/}
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"/>Departure 8:00 AM to 4:00PM
                                {/*<span className="pull-right">$154</span>*/}
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"/>Departure 4:00 PM to 12:00AM
                                {/*<span className="pull-right">$197</span>*/}
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
                            {/*<small>Price from</small>*/}
                        </h5>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"
                                onChange={(event)=>this.classModified(event,'Economy')}/>Economy
                                {/*<span className="pull-right">$154</span>*/}
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"
                                       onChange={(event)=>this.classModified(event,'Business')}
                                />Business
                                {/*<span className="pull-right">$316</span>*/}
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input className="i-check" type="checkbox"
                                onChange={(event)=>this.classModified(event,'First')}
                                />First
                                {/*<span className="pull-right">$450</span>*/}
                            </label>
                        </div>
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
        flightData : state.flightData,
        filterData: state.filterData
    };
}

export default connect(mapStateToProps,matchDispatchToProps)(FlightFilter);