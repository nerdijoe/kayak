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
  FormControl,
  MenuItem,
} from 'react-bootstrap';

import {
  axiosAddNewHotel,
  axiosDeleteHotel,
  searchHotel,
} from '../../actions';

import HotelNewForm from './HotelNewForm';
import HotelEditForm from './HotelEiditForm';

class HotelList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      editModal: false,
      deleteModal: false,
      editHotelData: {},
      deleteHotelData: {
      name: '',
      stars: '',
      address: '',
      city: '',
      state:'',
      counry: '',
      zipcode: '',
      isDeleted: '',
      roomType: '',
      price: 0,
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
    console.log('is this open?');
    this.setState({ showModal: true });
  }

  closeEditModal() {
    this.setState({ editModal: false });
  }

  openEditModal(hotel) {
    console.log('open');
    this.setState({ editModal: true });
    this.setState({ editHotelData: hotel });
  }

  closeDeleteModal() {
    this.setState({ deleteModal: false });
  }

  openDeleteModal(hotel) {
    console.log('open');
    this.setState({ deleteModal: true });
    this.setState({ deleteHotelData: hotel });
  }

  _addNotification(event) {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: `Hotel Name: [${this.state.deleteHotelData.name}] is deleted.`,
      level: 'success',
    });
  }

  handleAdd(e) {
        console.log('add button handle close modal');
        this.setState({ showModal: false });
        this.setState({ searchBar: '' });
  }

  handleEdit(e) {
        console.log('edit button handle close modal');
        this.setState({ editModal: false });
        this.setState({ searchBar: '' });
  }

  handleDelete(e) {
    console.log('delete');
    this.props.axiosDeleteHotel(this.state.deleteHotelData);
    this.setState({ deleteModal: false });
    
    this._addNotification(e);
  }

    onChange(e){
        const target = e.target;
        console.log(`handleChange [${target.value}]`);

        this.setState({
            [target.name]: target.value,
        });
        this.props.searchHotel(target.value);

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
            <Button bsStyle="success" bsSize="large" onClick={() => this.openModal() }>Add New Hotel</Button>
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
              <th>Hotel Name</th>
              <th>Stars</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Zipcode</th>
              <th>Room Type</th>
              <th>Price</th>
              <th>Action</th>
              </tr>
          </thead>
          <tbody>
            {(this.props.searchHotels.length == 0 ? this.props.hotels : this.props.searchHotels).filter(hotel =>
      hotel.isDeleted !== true).map((hotel) => {
                return (
                  <tr key={hotel._id}>
                    <td>{hotel.name}</td>
                    <td>{hotel.stars}</td>
                    <td>{hotel.address}</td>
                    <td>{hotel.city}</td>
                    <td>{hotel.state}</td>
                    <td>{hotel.country}</td>
                    <td>{hotel.zipcode}</td>
                    <td>{hotel.roomType}</td>
                    <td>{hotel.price}</td>
                    <td>
                      <Button bsStyle="info" onClick={() => this.openEditModal(hotel) }>edit</Button>
                      <DropdownButton title="..." id="bg-nested-dropdown">
                        <MenuItem eventKey="1" onClick={() => this.openEditModal(hotel)}>Edit</MenuItem>
                        <MenuItem eventKey="2" onClick={() => this.openDeleteModal(hotel)}>Delete</MenuItem>
                      </DropdownButton>
                    </td>
                  </tr>              
                )
              })
            }
          </tbody>
        </Table>

{/*-----------------Add new hotel----------------------------*/}
        <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Hotel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Form</h4>
            <HotelNewForm handleAdd = {this.handleAdd.bind(this)}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeModal()}>Close</Button>
          </Modal.Footer>
        </Modal>

{/*-----------------Edit hotel----------------------------*/}
        <Modal show={this.state.editModal} onHide={() => this.closeEditModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Hotel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Form</h4>
            <HotelEditForm handleEdit = {this.handleEdit.bind(this)} editHotelData={this.state.editHotelData} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeEditModal()}>Close</Button>
          </Modal.Footer>
        </Modal>

{/*-----------------Delete hotel----------------------------*/}
        <Modal show={this.state.deleteModal} onHide={() => this.closeDeleteModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Hotel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>Hotel Name</th>
                  <th>Stars</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Zipcode</th>
                  <th>Room Type</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tr>
                  <td>{this.state.deleteHotelData.name}</td>
                  <td>{this.state.deleteHotelData.stars}</td>
                  <td>{this.state.deleteHotelData.address}</td>
                  <td>{this.state.deleteHotelData.city}</td>
                  <td>{this.state.deleteHotelData.state}</td>
                  <td>{this.state.deleteHotelData.counry}</td>
                  <td>{this.state.deleteHotelData.zipcode}</td>
                  <td>{this.state.deleteHotelData.roomType}</td>
                  <td>{this.state.deleteHotelData.price}</td>
              </tr>
            </Table>
            <p>Do you want to delete this hotel?</p>

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
    axiosAddNewHotel: (data) => { dispatch(axiosAddNewHotel(data)); },
    axiosDeleteHotel: (data) => { dispatch(axiosDeleteHotel(data)); },
    searchHotel: (data) => { dispatch(searchHotel(data)); },
  };
};

const mapStateToProps = (state) => {
  return {
    hotels: state.HotelReducer.hotels,
    searchHotels: state.HotelReducer.searchHotels,
  };
};

const connectedHotelList = connect(mapStateToProps, mapDispatchToProps)(HotelList);
export default connectedHotelList;
