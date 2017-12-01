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
  axiosEditHotel,
} from '../../actions';

class HotelEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.editHotelData._id,
      name: this.props.editHotelData.name,
      stars: this.props.editHotelData.stars,
      address:this.props.editHotelData.address,
      city: this.props.editHotelData.city,
      state:this.props.editHotelData.state,
      country: this.props.editHotelData.country,
      zipcode: this.props.editHotelData.zipcode,
      roomType: this.props.editHotelData.roomType,
      price: this.props.editHotelData.price,
      errors: {
            zipcodeError: '',
            priceError: '',}
    };
  }
  componentDidMount() {
    console.log('componentDidMount');
    console.log('  this.props.editHotelData=', this.props.editHotelData);
  }

  handleValidation(){
      let formIsValid = true;
      let errorsV = {zipcodeError: '', priceError: ''};

        //zipcode
        if(!this.state.zipcode.match(/^\d{5}(?:[-\s]\d{4})?$/)){
            formIsValid = false;
            errorsV.zipcodeError = "Only digits and at leat 5";
        }

      //price
      if(this.state.price <= 0){
          formIsValid = false;
          errorsV.priceError = "price error";
      }

      this.setState({errors: errorsV});
      return formIsValid;
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

    const editedHotel = {
        _id: this.state._id,
        name: this.state.name,
        stars: this.state.stars,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        zipcode: this.state.zipcode,
        roomType: this.state.roomType,
        price: this.state.price,
    }


      if(this.handleValidation()){
          alert("Form edit saved");
          this.props.handleEdit();
          this.props.axiosEditHotel(editedHotel);
      }else{
          alert("Form has errors.")
      }


    // this.props.history.push('/signin');
  }



  render() {
    return (
      <div className="content">

        <Form horizontal onSubmit={(e) => { this.handleSubmit(e); }} >

          <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
              Hotel Name
              </Col>
              <Col sm={10}>
                  <FormControl type="text" value={this.state.name} name="name" onChange={(e) => { this.handleChange(e); }} required>
                  </FormControl>
              </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
              Stars
              </Col>
              <Col sm={10}>
                  <FormControl componentClass="select" value={this.state.stars} name="stars" onChange={(e) => { this.handleChange(e); }} required>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                  </FormControl>
              </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
              Address
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={this.state.address} name="address" onChange={(e) => { this.handleChange(e); }} required>
              </FormControl>
              </Col>
          </FormGroup>


          <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
              City
              </Col>
              <Col sm={10}>
                <FormControl type="text" name="city" value={this.state.city} onChange={(e) => { this.handleChange(e); }} required/>
              </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
              state
              </Col>
              <Col sm={10}>
                <FormControl type="text" name="state" value={this.state.state} onChange={(e) => { this.handleChange(e); }} required/>
              </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
              Country
              </Col>
              <Col sm={10}>
                 <FormControl type="text" name="country" value={this.state.country} onChange={(e) => { this.handleChange(e); }} required/>
              </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
              Zipcode
              </Col>
              <Col sm={10}>
                <FormControl type="text" name="zipcode" value={this.state.zipcode} onChange={(e) => { this.handleChange(e); }} required/>
                <span style={{color: "red"}}>{this.state.errors.zipcodeError}</span>
              </Col>
          </FormGroup>

      <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={2}>
          Room Type
      </Col>
      <Col sm={10}>
          <FormControl required componentClass="select" defaultValue={this.state.roomType} name="roomType" onChange={(e) => { this.handleChange(e); }} required>
            <option value="big">big</option>
            <option value="small">small</option>
          </FormControl>
          </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
          Price($)/D
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
    airports: state.HotelReducer.airports,
    airlines: state.HotelReducer.airlines,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    axiosEditHotel: (data) => { dispatch(axiosEditHotel(data)); },
  };
};

const connectedHotelEditForm = connect(mapStateToProps, mapDispatchToProps)(HotelEditForm);
export default connectedHotelEditForm;
