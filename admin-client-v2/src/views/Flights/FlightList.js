import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';

import {
  Table,
  Button,
  Modal,
  OverlayTrigger,
  Popover,
  Tooltip,
  Row,
  Col,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';

import {
  axiosAddNewFlight,
  axiosDeleteFlight,
} from '../../actions';

import FlightNewForm from './FlightNewForm';
import FlightEditForm from './FlightEditForm';

class FlightList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      editModal: false,
      deleteModal: false,
      editFlightData: {},
      deleteFlightData: {
      flightNumber: '',
      departureTime: '',
      arrivalTime: '',
      departureAirport: '',
      arrivalAirport:'',
      airline: '',
      prices: [ {"type": "business", "price": ''},{"type": "economic", "price": ''},{"type": "first", "price": ''} ]
      },
      _notificationSystem: null,
    };
  }

  getInitialState() {
    return { showModal: false };
  }

  componentDidMount() {

    this._notificationSystem = this.refs.notificationSystem;
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    console.log('open');
    this.setState({ showModal: true });
  }

  closeEditModal() {
    this.setState({ editModal: false });
  }

  openEditModal(flight) {
    console.log('open');
    console.log("this.props.airports is: ");
      console.log(this.props.airports);
    this.setState({ editModal: true });
    this.setState({ editFlightData: flight });
  }

  closeDeleteModal() {
    this.setState({ deleteModal: false });
  }

  openDeleteModal(flight) {
    console.log('open');
    console.log(flight.prices[0].price);
    this.setState({ deleteModal: true });
    this.setState({ deleteFlightData: flight });
  }

  _addNotification(event) {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: `Flight Number: [${this.state.deleteFlightData.flightNumber}] Airline: [${this.state.deleteFlightData.airline}] is deleted.`,
      level: 'success',
    });
  }

  handleDelete(e) {
    console.log('delete');
    this.props.axiosDeleteFlight(this.state.deleteFlightData);
    this.setState({ deleteModal: false });
    
    this._addNotification(e);
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div className="Content">
        <Row>
          <Col md={8} >
            <Button bsStyle="success" bsSize="large" onClick={() => this.openModal() }>Add New Flight</Button>
          </Col>
        </Row>

        <NotificationSystem ref="notificationSystem" />

        <Table responsive>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Departure Airport</th>
              <th>Arrival Airport</th>
              <th>Airline</th>
              <th>Business Class Price($)</th>
              <th>Economic Class Price($)</th>
              <th>First Class Price($)</th>
              <th>Action</th>
              </tr>
          </thead>
          <tbody>
            {
              this.props.flights.filter(flight => flight.isDeleted !== true).map((flight) => {
                return (
                  <tr key={flight._id}>
                    <td>{flight.flightNumber}</td>
                    <td>{flight.departureTime}</td>
                    <td>{flight.arrivalTime}</td>
                    <td>{this.props.airports.find(airport => airport._id === flight.departureAirport).name}</td>
                    <td>{this.props.airports.find(airport => airport._id === flight.arrivalAirport).name}</td>
                    <td>{this.props.airlines.find(airline => airline._id === flight.airline).name}</td>
                    <td>{flight.prices[0].price}</td>
                    <td>{flight.prices[1].price}</td>
                    <td>{flight.prices[2].price}</td>
                    <td>
                      <Button bsStyle="info" onClick={() => this.openEditModal(flight) }>edit</Button>
                      <DropdownButton title="..." id="bg-nested-dropdown">
                        <MenuItem eventKey="1" onClick={() => this.openEditModal(flight)}>Edit</MenuItem>
                        <MenuItem eventKey="2" onClick={() => this.openDeleteModal(flight)}>Delete</MenuItem>
                      </DropdownButton>
                    </td>
                  </tr>              
                )
              })
            }
          </tbody>
        </Table>


        <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Flight</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Form</h4>
            <FlightNewForm />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeModal()}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.editModal} onHide={() => this.closeEditModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Flight</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Form</h4>
            <FlightEditForm editFlightData={this.state.editFlightData} />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeEditModal()}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.deleteModal} onHide={() => this.closeDeleteModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Flight</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table responsive>
              <thead>
                <tr>
                    <th>Flight Number</th>
                    <th>Departure Airport</th>
                    <th>Arrival Airport</th>
                    <th>Airline</th>
                    <th>Business Class Price</th>
                    <th>Economic Class Price</th>
                    <th>First Class Price</th>
                </tr>
              </thead>

              <tr>
                  <td>{this.state.deleteFlightData.flightNumber}</td>
                  <td>{this.state.deleteFlightData.departureAirport}</td>
                  <td>{this.state.deleteFlightData.arrivalAirport}</td>
                  <td>{this.state.deleteFlightData.airline}</td>
                  <td>{this.state.deleteFlightData.prices[0].price}</td>
                  <td>{this.state.deleteFlightData.prices[1].price}</td>
                  <td>{this.state.deleteFlightData.prices[2].price}</td>
              </tr>
            </Table>
            <p>Do you want to delete this flight?</p>

            <Button bsStyle="danger" onClick={(e) => { this.handleDelete(e); }}>Yes</Button>
            <Button bsStyle="primary" onClick={() => this.closeDeleteModal() }>No</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeDeleteModal()}>Close</Button>
          </Modal.Footer>
        </Modal>


      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    axiosAddNewFlight: (data) => { dispatch(axiosAddNewFlight(data)); },
    axiosDeleteFlight: (data) => { dispatch(axiosDeleteFlight(data)); },
  };
};

const mapStateToProps = (state) => {
  return {
    flights: state.FlightReducer.flights,
    airports: state.FlightReducer.airports,
    airlines: state.FlightReducer.airlines,
  };
};

const connectedFlightList = connect(mapStateToProps, mapDispatchToProps)(FlightList);
export default connectedFlightList;
