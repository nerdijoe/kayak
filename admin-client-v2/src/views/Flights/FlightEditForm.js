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
      departureAirport: this.props.editFlightData.departureAirport,
      arrivalAirport:this.props.editFlightData.arrivalAirport,
      airline: this.props.editFlightData.airline,
      business: this.props.editFlightData.prices[0].price,
      economic: this.props.editFlightData.prices[1].price,
      first: this.props.editFlightData.prices[2].price,

    };
  }
  componentDidMount() {
    console.log('componentDidMount');
    console.log('  this.props.editFlightData=', this.props.editFlightData);
    console.log('this.props.airport=', this.props.airports);
  }

  handleChange(e) {
    const target = e.target;
    console.log(`handleChange ${target.name}=[${target.value}]`);
    
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit', this.state);
    const editedFlight = {
        flightNumber: this.state.flightNumber,
        departureTime: this.state.departureTime,
        arrivalTime: this.state.arrivalTime,
        departureAirport: this.state.departureAirport,
        arrivalAirport:this.state.arrivalAirport,
        airline: this.state.airline,
        prices: [
            {type: 'business', price: this.state.business},
            {type: 'economic', price: this.state.economic},
            {type: 'first', price: this.state.first},
        ],
    }
    this.props.axiosEditFlight(editedFlight);

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
                  <FormControl type="text"  name="flightNumber" value={this.state.flightNumber} onChange={(e) => { this.handleChange(e); }} />
              </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
              Departure Time
              </Col>
              <Col sm={10}>
                  <FormControl type="time"  name="departureTime" value={this.state.departureTime} onChange={(e) => { this.handleChange(e); }} />
              </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
              Arrival Time
              </Col>
              <Col sm={10}>
                  <FormControl type="time"  name="arrivalTime" value={this.state.arrivalTime} onChange={(e) => { this.handleChange(e); }} />
              </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Departure Airport
            </Col>
            <Col sm={10}>
              <FormControl componentClass="select" value={this.state.departureAirport} name="departureAirport" onChange={(e) => { this.handleChange(e); }}>
                {this.props.airports.map((airport) => {
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
                  <FormControl componentClass="select" value={this.state.arrivalAirport} name="arrivalAirport" onChange={(e) => { this.handleChange(e); }}>
                      {this.props.airports.map((airport) => {
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
                  <FormControl componentClass="select" value={this.state.airline} name="airline" onChange={(e) => { this.handleChange(e); }}>
                      {this.props.airlines.map((airline) => {
                          return (
                      <option key={airline._id} value={airline._id}>{airline.name}</option>
                      )
                      })
                      }
                  </FormControl>
              </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Business Class Price($)
            </Col>
            <Col sm={10}>
              <FormControl type="number"name="business" value={this.state.business} onChange={(e) => { this.handleChange(e); }} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                  Economic Class Price($)
              </Col>
              <Col sm={10}>
                  <FormControl type="number"name="economic" value={this.state.economic} onChange={(e) => { this.handleChange(e); }} />
              </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                  First Class Price($)
              </Col>
              <Col sm={10}>
                  <FormControl type="number"name="first" value={this.state.first} onChange={(e) => { this.handleChange(e); }} />
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
