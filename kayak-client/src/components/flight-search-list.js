import React , {Component} from 'react';

class FlightSearchList extends Component{
    render(){
        const flight = this.props.flight;
        console.log(flight);
        console.log(flight.imageURL);
        const image = flight.imageURL;
        return(
            <li>
                <div className="booking-item-container">
                    <div className="booking-item">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="booking-item-airline-logo">
                                    {/*<img src={require(flight.imageURL)} alt="Failed to load Image"
                                         title="Image Title"/>*/}
                                    <img src={image} alt="Failed to load Image"
                                         title="Image Title"/>
                                    <p>{flight.airlines}</p>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="booking-item-flight-details">
                                    <div className="booking-item-departure"><i className="fa fa-plane"></i>
                                        <h5>{flight.departTime}</h5>
                                        <p className="booking-item-date">{flight.departureDate}</p>
                                        <p className="booking-item-destination">{flight.origin}</p>
                                    </div>
                                    <div className="booking-item-arrival"><i
                                        className="fa fa-plane fa-flip-vertical"></i>
                                        <h5>{flight.arrivalTime}</h5>
                                        <p className="booking-item-date">{flight.arrivalDate}</p>
                                        <p className="booking-item-destination">{flight.destination}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2" >
                                {/*<h5>22h 50m</h5>*/}
                                <h5>Duration</h5>
                                <h5>{flight.flightDuration}</h5>
                            </div>
                            <div className="col-md-3"><span className="booking-item-price">${flight.price}</span><span>/person</span>
                                <p className="booking-item-flight-class">Class: {flight.class}</p><a
                                    className="btn btn-primary" href="#">Select</a>
                            </div>
                        </div>
                    </div>
                    {/*<div className="booking-item-details">
                        <div className="row">
                            <div className="col-md-8">
                                <p>Flight Details</p>
                                <h5 className="list-title">London (LHR) to Charlotte (CLT)</h5>
                                <ul className="list">
                                    <li>US Airways 731</li>
                                    <li>Economy / Coach className ( M), AIRBUS INDUSTRIE A330-300</li>
                                    <li>Depart 09:55 Arrive 15:10</li>
                                    <li>Duration: 9h 15m</li>
                                </ul>
                                <h5>Stopover: Charlotte (CLT) 7h 1m</h5>
                                <h5 className="list-title">Charlotte (CLT) to New York (JFK)</h5>
                                <ul className="list">
                                    <li>US Airways 1873</li>
                                    <li>Economy / Coach className ( M), Airbus A321</li>
                                    <li>Depart 22:11 Arrive 23:53</li>
                                    <li>Duration: 1h 42m</li>
                                </ul>
                                <p>Total trip time: 17h 58m</p>
                            </div>
                        </div>
                    </div>*/}
                </div>
            </li>
        )
    }
}

export default FlightSearchList;