import React , {Component} from 'react';
import {hBookingSelected, bookingFlag} from "../actions/index";
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
class HotelList extends Component{

    handleHotelBooking =() => {
        let hotelSelection = this.props.hotel;
        let payload = 'H';
        this.props.hBookingSelected(hotelSelection);
        this.props.bookingFlag(payload);
        this.props.history.push('/booking');
        console.log('insdde booking hotel');
    }

    render(){
        const hotel = this.props.hotel;
        console.log(hotel);
        let stars = [];
        for (var i = 0; i < hotel.stars; ++i) {
            stars.push(<li key={i}><i className="fa fa-star"></i></li>)
        }
        let imageURL = "http://localhost:3000/image/hotel"+Math.floor(Math.random()*6)+".jpg";
        return(
            <li>
                <a className="booking-item" href="#">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="col-md-4">
                                <div className="booking-item-img-wrap">
                                    <img src={imageURL}
                                         title="Hotel"/>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="booking-item-rating">
                                    <span className="booking-item-rating-number"><b>Stars</b></span>
                                    <ul className="icon-group booking-item-rating-stars">
                                        {stars}
                                    </ul>
                                    {/*<span className="booking-item-rating-number"><b >4.4</b> of 5</span><small>(406 reviews)</small>*/}
                                </div>
                                <h5 className="booking-item-title">{hotel.name}</h5>
                                <p className="booking-item-address"><i
                                    className="fa fa-map-marker"></i>
                                    {hotel.city}, {hotel.state} {hotel.address}</p>
                                <br/>
                                <br/>
                            </div>
                            <p className="booking-item-flight-className" style={{paddingLeft:15}} >Reviews :</p>
                            {
                                hotel.reviews.map((review, index) => {
                                    return (
                                        <div className="row review-pad">
                                            <p className="booking-item-car-title">{review.user}:{review.rating}<i className="fa fa-star"></i></p>
                                            <p className="booking-item-car-title">comments:{review.content}</p>
                                            <br/>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="col-md-3">
                            {/*{
                                hotel.rooms.map((room, index) => {
                                    return (
                                        <div>
                                                                <span
                                                                    className="booking-item-price-from">{room.type}</span>
                                            <span
                                                className="booking-item-price">${room.price}</span><span>/night</span>
                                        </div>
                                    );
                                })
                            }*/}
                            <span className="booking-item-price-from">Size: {hotel.roomType}</span>
                            <br/>
                            <span className="booking-item-price">${hotel.price}</span><span>/night</span>
                            <span className="btn btn-book" onClick={this.handleHotelBooking}>Book</span>
                        </div>
                    </div>
                </a>
            </li>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        hBookingSelected: (data) => dispatch(hBookingSelected(data)),
        bookingFlag: (data) => dispatch(bookingFlag(data))
    };
}

function mapStateToProps(state) {
    return{
        bookingSelectedProp : state.hBookingSelected,
        bookingFlagProp : state.bookingFlag
    };
}

const hotelList = withRouter(connect(mapStateToProps, mapDispatchToProps)(HotelList));
export default hotelList;