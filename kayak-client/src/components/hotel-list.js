import React , {Component} from 'react';

class HotelList extends Component{
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
                                         alt="Image Alternative text"
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
                            <span className="booking-item-price-from">{hotel.type}</span>
                            <span className="booking-item-price">${hotel.price}</span><span>/night</span>
                            <span className="btn btn-book">Book Now</span>
                        </div>
                    </div>
                </a>
            </li>
        )
    }
}

export default HotelList;