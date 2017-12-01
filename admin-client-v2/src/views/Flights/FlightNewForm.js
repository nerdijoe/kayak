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
  axiosAddNewFlight,
} from '../../actions';

class FlightNewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        flightNumber: '',
        departureTime: '',
        arrivalTime: '',
        departureAirport: this.props.airports && this.props.airports[0].name,
        arrivalAirport: this.props.airports && this.props.airports[0].name,
        airline: this.props.airlines && this.props.airlines[0].name,
        classType: 'Business',
        price: 0,
        errors: {
            flightNumberError: '',
            priceError: '',}


    };
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
        if(!this.state.price.match(/^\d+(\.\d{2})?$/)){
          formIsValid = false;
          errorsV.priceError = "price error";
        }

        this.setState({errors: errorsV});
        return formIsValid;
  }

  handleChange(e) {
    const target = e.target;
    console.log(`handleChange ${target.name}=[${target.value}]`);

    const empty = this.props.airports.filter((airport) => airport._id === target.value);
    console.log(empty);
    
    this.setState({
      [target.name]: target.value,
    });
  }


  handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit', this.state);
    const newFlight = {
          flightNumber: this.state.flightNumber,
          departureTime: this.state.departureTime,
          arrivalTime: this.state.arrivalTime,
          departureAirport: this.state.departureAirport,
          arrivalAirport:this.state.arrivalAirport,
          airline: this.state.airline,
          classType: this.state.classType,
          price: this.state.price,

      };
    console.log("the flight will be created is: ", newFlight);


    if(this.handleValidation()){
          alert("Form submitted");
          this.props.handleAdd();
          this.props.axiosAddNewFlight(newFlight);
    }else{
          alert("Form has errors.");
    }

    // this.props.history.push('/signin');
  }



  render() {
    return (
      <div className="content">

        <Form horizontal onSubmit={(e) => { this.handleSubmit(e); }} >

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Flight Number
            </Col>
            <Col sm={10}>
              <FormControl required type="text" value={this.state.flightNumber} name="flightNumber" onChange={(e) => { this.handleChange(e); }}>
              </FormControl>
              <span style={{color: "red"}}>{this.state.errors.flightNumberError}</span>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
              Departure Time
              </Col>
              <Col sm={10}>
                  <FormControl type="datetime-local" value={this.state.departureTime} name="departureTime"
                        onChange={(e) => { this.handleChange(e); }} required>
                  </FormControl>
              </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
                 Arrival Time
              </Col>
              <Col sm={10}>
                  <FormControl type="datetime-local" value={this.state.arrivalTimeTime} name="arrivalTime"
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
                  <FormControl required componentClass="select" value={this.state.classType} name="classType" onChange={(e) => { this.handleChange(e); }} required>
                      <option value="Business">Business</option>
                      <option value="Economic">Economic</option>
                      <option value="First">First</option>
              </FormControl>
              </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Price($)
            </Col>
            <Col sm={10}>
              <FormControl required type="number" name="price" value={this.state.economic} onChange={(e) => { this.handleChange(e); }} />
              <span style={{color: "red"}}>{this.state.errors.priceError}</span>
            </Col>
          </FormGroup>


          <FormGroup>
            <Col smOffset={10} sm={2}>
              <Button bsStyle="success" type="submit">
                Add
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
    axiosAddNewFlight: (data) => { dispatch(axiosAddNewFlight(data)); },
  };
};

const connectedFlightNewForm = connect(mapStateToProps, mapDispatchToProps)(FlightNewForm);
export default connectedFlightNewForm;
