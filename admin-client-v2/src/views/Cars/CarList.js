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
  FormControl,
} from 'react-bootstrap';

import {
  axiosAddNewCar,
  axiosDeleteCar,
  searchCar,
} from '../../actions';

import CarNewForm from './CarNewForm';
import CarEditForm from './CarEditForm';

class CarList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      editModal: false,
      deleteModal: false,
      editCarData: {},
      deleteCarData: {
        dealer: { name: ''},
        type: '',
        make: '',
        model: '',
        price: '',
        doorNumber: '',
        capacity: '',
      },
      searchBar: '',
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

  openEditModal(car) {
    console.log('open');
    this.setState({ editModal: true });
    this.setState({ editCarData: car });
  }

  closeDeleteModal() {
    this.setState({ deleteModal: false });
  }

  openDeleteModal(car) {
    console.log('open');
    this.setState({ deleteModal: true });
    this.setState({ deleteCarData: car });
  }

  _addNotification(event) {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: `Car at dealer [${this.state.deleteCarData.dealer.name}] and type [${this.state.deleteCarData.make}] is deleted.`,
      level: 'success',
    });
  }

  handleDelete(e) {
    console.log('delete');
    this.props.axiosDeleteCar(this.state.deleteCarData);
    this.setState({ deleteModal: false });
    
    this._addNotification(e);
  }

  onChange(e){
    const target = e.target;
    console.log(`handleChange [${target.value}]`);

    this.setState({
       [target.name]: target.value,
    });
    this.props.searchCar(target.value);

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
          <Col md={4} >
            <Button bsStyle="success" bsSize="large" onClick={() => this.openModal() }>Add New Car</Button>
          </Col>
          <Col md={5} >
              <FormControl type="text" value={this.state.searchBar} name="searchBar"
          onChange={(e) => this.onChange(e)} placeholder="INPUT SEARCH KEY WORD">
              </FormControl>
          </Col>
        </Row>

        <NotificationSystem ref="notificationSystem" />

        <Table responsive>
          <thead>
            <tr>
              <th>Dealer</th>
              <th>Type</th>
              <th>Make</th>
              <th>Model</th>
              <th>Price</th>
              <th>Doors</th>
              <th>Capacity</th>
              <th>Action</th>
              </tr>
          </thead>
          <tbody>
            {
              this.props.cars && this.props.searchCars.filter(car => car.isDeleted !== true).map((car) => {
                return (
                  <tr key={car._id}>
                    <td>{car.dealer.name}</td>
                    <td>{car.type}</td>
                    <td>{car.make}</td>
                    <td>{car.model}</td>
                    <td>{car.price}</td>
                    <td>{car.doorNumber}</td>
                    <td>{car.capacity}</td>
                    <td>
                      <Button bsStyle="info" onClick={() => this.openEditModal(car) }>edit</Button>
                      <DropdownButton title="..." id="bg-nested-dropdown">
                        <MenuItem eventKey="1" onClick={() => this.openEditModal(car)}>Edit</MenuItem>
                        <MenuItem eventKey="2" onClick={() => this.openDeleteModal(car)}>Delete</MenuItem>
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
            <Modal.Title>Add New Car</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Form</h4>
            <CarNewForm />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeModal()}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.editModal} onHide={() => this.closeEditModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Car</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Form</h4>
            <CarEditForm editCarData={this.state.editCarData} />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeEditModal()}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.deleteModal} onHide={() => this.closeDeleteModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Car</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>Dealer</th>
                  <th>Type</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Price</th>
                  <th>Doors</th>
                  <th>Capacity</th>
                </tr>
              </thead>

              <tr>
                <td>{this.state.deleteCarData.dealer.name}</td>
                <td>{this.state.deleteCarData.type}</td>
                <td>{this.state.deleteCarData.make}</td>
                <td>{this.state.deleteCarData.model}</td>
                <td>{this.state.deleteCarData.price}</td>
                <td>{this.state.deleteCarData.doorNumber}</td>
                <td>{this.state.deleteCarData.capacity}</td>
              </tr>
            </Table>
            <p>Do you want to delete this car?</p>

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
    axiosAddNewCar: (data) => { dispatch(axiosAddNewCar(data)); },
    axiosDeleteCar: (data) => { dispatch(axiosDeleteCar(data)); },
    searchCar: (data) => { dispatch(searchCar(data)); },
  };
};

const mapStateToProps = (state) => {
  return {
    cars: state.CarReducer.cars,
    searchCars: state.CarReducer.searchCars,
  };
};

const connectedCarList = connect(mapStateToProps, mapDispatchToProps)(CarList);
export default connectedCarList;
