/**
 * Created by ManaliJain on 11/16/17.
 */

import React, {Component} from 'react';
import Hotels from './hotels.js';
import Flights from './flights.js';
import Cars from './cars.js';
class Search extends Component{

    constructor(props){
        super(props);
        this.state = {
            "selection": props.selection
        }
    }
    componentWillMount(){
        if(this.props.selection==="hotels") {
            document.body.style.backgroundImage = "url(../image/phoenix-hotels-bg.jpg)";
        }
        if(this.props.selection==="flights") {
            document.body.style.backgroundImage = "url(../image/phoenix-flights-bg.jpg)";
        }
        if(this.props.selection==="cars") {
            document.body.style.backgroundImage = "url(../image/phoenix-cars-bg.jpg)";
        }
    }
    tabCLick = (selection) => {
        this.setState({
            "selection": selection
        });
    }

    isSearchTabActive = (value) =>{
        // return 'btn '+((value===this.state.selection) ?'active':'default');
        return "tab-pane fade "+((value === this.state.selection) ?'in active':'');
    }

    isActive = (value) =>{
        // return 'btn '+((value===this.state.selection) ?'active':'default');
        return ((value === this.state.selection) ?'active':'');
    }

    render(){
        let hotelTab =null;
        let flightTab =null;
        let carTab =null;
        if(this.state.selection === 'hotels'){
            hotelTab = <Hotels/>
        }
        if(this.state.selection === 'flights'){
            flightTab = <Flights/>
        }
        if(this.state.selection === 'cars'){
            carTab = <Cars/>
        }

        return(
            <div className="bg-front full-center" >
                <div className="container">
                    <div className="search-tabs search-tabs-bg">
                        <h1>Search hundreds of travel sites at once</h1>
                        <div className="tabbable">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className={this.isActive('hotels')}>
                                    <a data-toggle="tab" role="tab" onClick={() => this.tabCLick('hotels')}>
                                        <span className="icon" aria-label="Hotels icon"></span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" viewBox="0 0 25 17">
                                                <path d="M2 14.77h21v2H2z"></path>
                                                <path d="M6 7.07V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.07h1V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.07h2V0H4v7.07h2zM21 8.67H4a4.06 4.06 0 0 0-4 4.07v2.43h25v-2.43a4.06 4.06 0 0 0-4-4.07z"></path>
                                            </svg><i className="fa fa-building-o"> </i> <span className = "tab-span">Hotels</span>
                                    </a>
                                </li>
                                <li className={this.isActive('flights')}>
                                    <a data-toggle="tab" role="tab" onClick={() => this.tabCLick('flights')}>
                                        <span className="icon" aria-label="Flights icon"></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M16.79 7.83l-3.93 3.93 4.51 7.05.76-.76-1.34-10.22M12.24 3.15L1.62 1.76l-.75.76 7.32 4.69 4.05-4.06"></path>
                                            <path d="M10.73 11.94l1.3-1.3 4.28-4.28 2.8-2.8s1.54-2.12.46-3.17-3.17.47-3.17.47l-2.62 2.62-4.4 4.4L8 9.24a20 20 0 0 0-2.23 3.2l-4.67-.89L0 12.62l3.79 2.65.92.92L7.41 20l1.07-1.1-.91-4.76a20.06 20.06 0 0 0 3.16-2.2z"></path>
                                        </svg><i className="fa fa-plane"></i> <span className = "tab-span">Flights</span>
                                    </a>
                                </li>
                                <li className={this.isActive('cars')}>
                                    <a data-toggle="tab" role="tab" onClick={() => this.tabCLick('cars')}>
                                        <span className="icon" aria-label="Cars icon"></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" fill="currentColor" viewBox="0 0 32 17">
                                            <path d="M10.6 2.77L.61 1.2V0h9.99v2.77"></path>
                                            <path fill="none" d="M12 1.84v3.33l8.14.11C18.29 3.56 16 1.87 14.72 1.84c-.96-.03-2.72 0-2.72 0z"></path><path d="M31 7.77c-.87-1.6-8.41-2.52-8.41-2.52S17.3.46 14.53 0H6.37h1.5A7.73 7.73 0 0 0 3 1.59a18.47 18.47 0 0 0-3 4.23v3.83c0 3.86 1.55 4.49 2.53 4.52v-.13A3.76 3.76 0 1 1 10 14v.07l9-.01a3.76 3.76 0 0 1 7.52 0h.79a7 7 0 0 0 3.9-.93A28.38 28.38 0 0 0 31 7.77zm-19-2.6V1.84h2.72c1.3 0 3.56 1.72 5.42 3.45z"></path>
                                            <circle cx="22.71" cy="14.04" r="2.36"></circle><circle cx="6.28" cy="14.04" r="2.36"></circle>
                                        </svg><i className="fa fa-car"></i> <span className = "tab-span">Cars</span>
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">

                                <div className={this.isSearchTabActive('hotels')} id="tab-1" role ="tabpanel">
                                    {hotelTab}
                                </div>

                                <div className={this.isSearchTabActive('flights')} id="tab-2" role ="tabpanel">
                                    {flightTab}
                                </div>

                                <div className={this.isSearchTabActive('cars')} id="tab-4">
                                    {carTab}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Search;
