import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Radio,
} from 'react-bootstrap';

import {
  axiosEditFlight,
} from '../../actions';

class FlightEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.editFlightData._id,
      flightNumber: this.props.editFlightData.flightNumber,
      departureTime: this.props.editFlightData.departureTime,
      arrivalTime:this.props.editFlightData.arrivalTime,
      departureAirport: this.props.editFlightData.departureAirport._id,
      arrivalAirport:this.props.editFlightData.arrivalAirport._id,
      airline: this.props.editFlightData.airline._id,
      class: this.props.editFlightData.class,
      price: this.props.editFlightData.price,
      errors: {
            flightNumberError: '',
            priceError: '',}

    };
  }
  componentDidMount() {
    console.log('componentDidMount');
    console.log('  this.props.editFlightData=', this.props.editFlightData);
    console.log('this.props.airport=', this.props.airports);
    console.log('arrivalTime type is: ', this.state.arrivalTime.substr(0,15));
  }

  handleChange(e) {
    const target = e.target;
    console.log(`handleChange ${target.name}=[${target.value}]`);
    
    this.setState({
      [target.name]: target.value,
    });
  }

  handleValidation(){
     let formIsValid = true;
     let errorsV = {flightNumberError: '', priceError: ''};

        //flight number
     if(!this.state.flightNumber.match(/^[A-Z]{2}\d{3}$/)){
         formIsValid = false;
         errorsV.flightNumberError = "2 upcase letters and 3 digits";
     }

     //price
     if(this.state.price <= 0){
         formIsValid = false;
         errorsV.priceError = "price error";
     }

        this.setState({errors: errorsV});
        return formIsValid;
    }


  handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit', this.state);
    const editedFlight = {
        _id: this.props.editFlightData._id,
        flightNumber: this.state.flightNumber,
        departureTime: this.state.departureTime,
        arrivalTime: this.state.arrivalTime,
        departureAirport: this.state.departureAirport,
        arrivalAirport:this.state.arrivalAirport,
        airline: this.state.airline,
        class: this.state.class,
        price: this.state.price,
    }

    if(this.handleValidation()){
        this.props.handleEdit();
        this.props.axiosEditFlight(editedFlight);
        alert("Form submitted");
    }else{
          alert("Form has errors.");
    }

    // this.props.history.push('/signin');
  }



  render() {
    return (
      <div className="content">

        <Form horizontal onSubmit={(e) => { this.handleSubmit(e); }} >

          <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
              Flight Number
              </Col>
              <Col sm={10}>
                  <FormControl required type="text" value={this.state.flightNumber} name="flightNumber" onChange={(e) => { this.handleChange(e); }}>
                  </FormControl>
                  <span style={{color: "red"}}>{this.state.errors.flightNumberError}</span>
              </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
              Departure Time
              </Col>
              <Col sm={10}>
                  <FormControl type="datetime-local" value={this.state.departureTime.substr(0,16)} name="departureTime"
                  onChange={(e) => { this.handleChange(e); }} required>
                  </FormControl>
              </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
              Arrival Time
              </Col>
              <Col sm={10}>
                  <FormControl type="datetime-local" value={this.state.arrivalTime.substr(0,16)} name="arrivalTime"
                  onChange={(e) => { this.handleChange(e); }} required>
                  </FormControl>
              </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
              Departure Airport
              </Col>
              <Col sm={10}>
                  <FormControl required componentClass="select" value={this.state.departureAirport} name="departureAirport" onChange={(e) => { this.handleChange(e); }}>
                      {this.props.airports && this.props.airports.map((airport) => {
                          return (
                      <option key={airport._id} value={airport._id}>{airport.name}</option>
                      )
                      })
                      }
                  </FormControl>
              </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
              Arrival Airport
              </Col>
              <Col sm={10}>
                  <FormControl required componentClass="select" value={this.state.arrivalAirport} name="arrivalAirport" onChange={(e) => { this.handleChange(e); }}>
                      {this.props.airports && this.props.airports.map((airport) => {
                          return (
                      <option key={airport._id} value={airport._id}>{airport.name}</option>
                      )
                      })
                      }
                  </FormControl>
              </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
              AirLine
              </Col>
              <Col sm={10}>
              <FormControl required componentClass="select" value={this.state.airline} name="airline" onChange={(e) => { this.handleChange(e); }}>
                  {this.props.airlines && this.props.airlines.map((airline) => {
                      return (
                  <option key={airline._id} value={airline._id}>{airline.name}</option>
                  )
                  })
                  }
              </FormControl>
              </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
              Class Type
              </Col>
              <Col sm={10}>
                  <FormControl required componentClass="select" defaultValue={this.state.class} name="class" onChange={(e) => { this.handleChange(e); }} required>
                  <option value="business">Business</option>
                  <option value="economy">Economy</option>
                  <option value="first">First</option>
                  </FormControl>
              </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
              Price($)
              </Col>
              <Col sm={10}>
                  <FormControl required type="number" name="price" value={this.state.price} onChange={(e) => { this.handleChange(e); }} />
                  <span style={{color: "red"}}>{this.state.errors.priceError}</span>
              </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={10} sm={2}>
              <Button bsStyle="success" type="submit">
                Save
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    airports: state.FlightReducer.airports,
    airlines: state.FlightReducer.airlines,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    axiosEditFlight: (data) => { dispatch(axiosEditFlight(data)); },
  };
};

const connectedFlightEditForm = connect(mapStateToProps, mapDispatchToProps)(FlightEditForm);
export default connectedFlightEditForm;
