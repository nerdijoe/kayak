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
  axiosAddNewCar,
} from '../../actions';

class CarNewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      make: '',
      model: '',
      dealer: this.props.dealers[0]._id,
      description: '',
      price: '',
      doorNumber: '4',
      capacity: '4',
      formErrors: { firstname: '', lastname: '', email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      firstnameValid: false,
      lastnameValid: false,
      formValid: false,
    };
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
    this.props.axiosAddNewCar(this.state);

    // this.props.history.push('/signin');
  }



  render() {
    return (
      <div className="content">

        <Form horizontal onSubmit={(e) => { this.handleSubmit(e); }} >
          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Dealer
            </Col>
            <Col sm={10}>
              <FormControl componentClass="select" value={this.state.dealer} name="dealer" onChange={(e) => { this.handleChange(e); }}>
                {
                  this.props.dealers.map((dealer) => {
                  return (
                    <option value={dealer._id}>{dealer.name}</option>
                  )
                })}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Type
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Sedan" name="type" value={this.state.type} onChange={(e) => { this.handleChange(e); }} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Make
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Toyota" name="make" value={this.state.make} onChange={(e) => { this.handleChange(e); }} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Model
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Camry" name="model" value={this.state.model} onChange={(e) => { this.handleChange(e); }} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Description
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="description" name="description" value={this.state.description} onChange={(e) => { this.handleChange(e); }} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Price/day
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="30" name="price" value={this.state.price} onChange={(e) => { this.handleChange(e); }} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Number of Doors
            </Col>
            <Col sm={10}>
              <FormControl componentClass="select" value={this.state.doorNumber} name="doorNumber" onChange={(e) => { this.handleChange(e); }}>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Capacity
            </Col>
            <Col sm={10}>
              <FormControl componentClass="select" value={this.state.capacity} name="capacity" onChange={(e) => { this.handleChange(e); }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={10} sm={2}>
              <Button bsStyle="success" pullRight fill type="submit">
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
    dealers: state.CarReducer.dealers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    axiosAddNewCar: (data) => { dispatch(axiosAddNewCar(data)); },
  };
};

const connectedCarNewForm = connect(mapStateToProps, mapDispatchToProps)(CarNewForm);
export default connectedCarNewForm;
