import React , {Component} from 'react';
import {hBookingSelected, bookingFlag, hotelsData, hotelFilterData} from "../actions/index";
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Modal} from 'react-bootstrap';
import * as API from '../api/searchListings';
class HotelList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            message : '',
            rate : '',
            review : '',
            showModalReview : false
        }
        this.openModalReview = this.openModalReview.bind(this);
        this.closeModalReview = this.closeModalReview.bind(this);
    }
    closeModalReview() {
        this.setState({
            ...this.state,
            showModalReview: false
        });
    }
    openModalReview() {
        this.setState({ showModalReview: true });
    }
    handleHotelBooking =() => {
        let hotelSelection = this.props.hotel;
        let payload = 'H';
        this.props.hBookingSelected(hotelSelection);
        this.props.bookingFlag(payload);
        this.props.history.push('/booking');
        console.log('inside booking hotel');
    }
    handleUserUpdateReview=()=>{
        // const hotel = this.props.hotel;
        // let hotelsData = this.props.hotelFilteredData;
        if (localStorage.getItem('user_token') === null) {
            this.openModalError();
        } else{
            let user = localStorage.getItem('user_login_data');
            let loginData = '';
            if(user !== null)
            {
                loginData = JSON.parse(user);
            }
            let payload = {
                user : loginData.id,
                content : this.state.review,
                rating : this.state.rate
            }
            let reviewPayload = {
                user: loginData.firstName,
                content : this.state.review,
                rating : this.state.rate
            }
            this.APICallForReview(payload, reviewPayload);
        }
    }
    APICallForReview = (payload, reviewPayload) => {
        console.log("payload is ",payload);
        const hotel = this.props.hotel;
        let hotelsData = this.props.hotelFilteredData;
        API.updateReview(payload, hotel._id)
            .then((res) => {
                if (res.data) {
                    this.setState({
                        ...this.state,
                        message: res.data.message
                    });
                    this.closeModalReview();
                    let index = hotelsData.hotelFilteredData.findIndex(function(item, i){
                        return item._id === hotel._id;
                    });
                    console.log(index);
                    hotelsData.hotelFilteredData[index].reviews.push(reviewPayload);
                    this.props.hotelFilterData(hotelsData.hotelFilteredData);
                }
                else {
                    console.log('axiosSignUp', res);
                    this.closeModal();
                    this.setState({
                        ...this.state,
                        message: ''
                    });
                    this.openModalSuccess();
                }
            });
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
            <div style={{marginBottom:15}}>
                <Modal show={this.state.showModalReview} onHide={() => this.closeModalReview()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Give Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*{messageDivLogin}*/}
                        <div className="row justify-content-md-center">
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-5 col-form-label">
                                    All Fields are Mandatory
                                </label>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Comment</label>
                                <div className=" col-sm-8">
                                    <input type="text"  className="form-control"
                                           value={this.state.review}
                                           onChange={(event) => {
                                               this.setState({...this.state, review: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-offset-1 col-sm-2 col-form-label">Rating</label>
                                <div className="col-sm-2">
                                    <input type="text" className="form-control"
                                           value={this.state.rate}
                                           onChange={(event) => {
                                               this.setState({...this.state,rate: event.target.value});
                                           }}required/>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button  type="button" onClick={this.handleUserUpdateReview}>Submit</Button>
                        <Button onClick={() => this.closeModalReview()}>Close</Button>
                    </Modal.Footer>
                </Modal>
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
                            <p className="booking-item-flight-className" style={{paddingLeft:15}} >
                                Reviews : <button className="btn btn-book" onClick={this.openModalReview} type="button">Add Review</button></p>
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
                            <span className="booking-item-price-from">Size: {hotel.roomType}</span>
                            <br/>
                            <span className="booking-item-price">${hotel.price}</span><span>/night</span>
                            <span className="btn btn-book" onClick={this.handleHotelBooking}>Book</span>
                        </div>
                    </div>
                </a>
            </li>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        hBookingSelected: (data) => dispatch(hBookingSelected(data)),
        bookingFlag: (data) => dispatch(bookingFlag(data)),
        hotelsData: (data) => dispatch(hotelsData(data)),
        hotelFilterData: (data) => dispatch(hotelFilterData(data))
    };
}

function mapStateToProps(state) {
    return{
        bookingSelectedProp : state.hBookingSelected,
        bookingFlagProp : state.bookingFlag,
        hotelsDataProp : state.hotelsData,
        hotelFilteredData: state.hotelFilteredData
    };
}

const hotelList = withRouter(connect(mapStateToProps, mapDispatchToProps)(HotelList));
export default hotelList;