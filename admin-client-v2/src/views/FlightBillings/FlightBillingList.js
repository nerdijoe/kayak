import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import Moment from 'moment';

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

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  axiosAddNewFlight,
  axiosDeleteFlight,
  fetchFlightBillingSearchDate,
  fetchFlightBillingSearchMonth,
  fetchFlightBillingSearchYear,
} from '../../actions';

import FlightNewForm from './NewForm';
import FlightEditForm from './EditForm';
import Detail from './Detail';


class FlightBillingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      editModal: false,
      deleteModal: false,
      detailModal: false,
      editFlightData: {},
      deleteFlightData: {
        dealer: { name: ''},
        type: '',
        make: '',
        model: '',
        price: '',
        doorNumber: '',
        capacity: '',
      },
      detailBilling: {
        /*dealer: { name: ''},
        type: '',
        make: '',
        model: '',
        price: '',
        doorNumber: '',
        capacity: '',*/
      },
      _notificationSystem: null,
      startDate: Moment(),
      billingData: [],
      searchType: 'date',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  getInitialState() {
    return {
      showModal: false,
      // billingData: this.props.flightBillingAll,
    };
  }


  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    // this.setState({ billingData: this.props.flightBillingAll });
    this.billingData = this.props.flightBillingAll;
    console.log('componentDidMount this.props.flightBillingAll=', this.props.flightBillingAll);
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
    this.setState({ editModal: true });
    this.setState({ editFlightData: flight });
  }

  closeDeleteModal() {
    this.setState({ deleteModal: false });
  }

  openDeleteModal(flight) {
    console.log('open');
    this.setState({ deleteModal: true });
    this.setState({ deleteFlightData: flight });
  }

  closeDetailModal() {
    this.setState({ detailModal: false });
  }

  openDetailModal(flight) {
    console.log('open');
    this.setState({ detailModal: true });
    this.setState({ detailBilling: flight });
  }


  _addNotification(event) {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: `Flight at dealer [${this.state.deleteFlightData.dealer.name}] and type [${this.state.deleteFlightData.make}] is deleted.`,
      level: 'success',
    });
  }

  handleDelete(e) {
    console.log('delete');
    this.props.axiosDeleteFlight(this.state.deleteFlightData);
    this.setState({ deleteModal: false });
    
    this._addNotification(e);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });

    // if(date) {
    //   console.log('   date = ', Moment(date).format('L'));
    //   let arr = this.props.flightBillingAll.filter((item) => {
    //     console.log(`${item.createdAt}-->`, Moment(item.createdAt).format('L'));
    //     return Moment(item.createdAt).format('L') === Moment(date).format('L');
    //   })
  
    //   console.log('------------ arr=', arr);
    //   this.setState({ billingData: arr });
    // }
    // else {
    //   this.setState({ billingData: this.props.flightBillingAll});
    // }
    if (this.state.searchType === 'date') {
      this.props.fetchFlightBillingSearchDate(date);
    } else if (this.state.searchType === 'month') {
      this.props.fetchFlightBillingSearchMonth(date);
    } else {
      this.props.fetchFlightBillingSearchYear(date);
    }

  }

  handleSearchType(e) {
    const target = e.target;
    console.log(`handleChange ${target.name}=[${target.value}]`);
    
    this.setState({
      [target.name]: target.value,
    });
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
          <Col sm={2}>Filter billing </Col>
          <Col sm={2}>
            <FormControl componentClass="select" value={this.state.searchType} name="searchType" onChange={(e) => { this.handleSearchType(e); }}>
              <option value="date">Date</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </FormControl>
          </Col>

          <Col md={4} >
            {/* <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
            /> */}
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              isClearable={true}
              showMonthDropdown
              showYearDropdown
              todayButton={"Today"}
            />
          </Col>
        </Row>

        <NotificationSystem ref="notificationSystem" />

        <Table responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Airline</th>
              <th>Departure Airport</th>
              <th>Arrival Airport</th>
              <th>Price</th>
              <th>Quautity</th>
              <th>Total</th>
              <th>Booked date</th>
              <th>Action</th>
              </tr>
          </thead>
          <tbody>
            {
              this.props.flightBillingSearch.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.airline.name}</td>
                    <td>{item.departureAirport.name}</td>
                    <td>{item.arrivalAirport.name}</td>
                    <td>{item.priceBooked}</td>
                    <td>{item.qtyBooked}</td>
                    <td>{item.totalAmount}</td>
                    <td>{Moment(item.createdAt).format('L LT')}</td>
                    <td>
                      <Button bsStyle="info" onClick={() => this.openDetailModal(item)}>Detail</Button>
                      {/* <DropdownButton title="..." id="bg-nested-dropdown">
                        <MenuItem eventKey="1" onClick={() => this.openEditModal(item)}>Edit</MenuItem>
                        <MenuItem eventKey="2" onClick={() => this.openDeleteModal(item)}>Delete</MenuItem>
                      </DropdownButton> */}
                    </td>
                  </tr>
                );
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
            <Detail editFlightData={this.state.editFlightData} />

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
                <td>{this.state.deleteFlightData.dealer.name}</td>
                <td>{this.state.deleteFlightData.type}</td>
                <td>{this.state.deleteFlightData.make}</td>
                <td>{this.state.deleteFlightData.model}</td>
                <td>{this.state.deleteFlightData.price}</td>
                <td>{this.state.deleteFlightData.doorNumber}</td>
                <td>{this.state.deleteFlightData.capacity}</td>
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

        <Modal show={this.state.detailModal} onHide={() => this.closeDetailModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Detail detailBilling={this.state.detailBilling} />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeDetailModal()}>Close</Button>
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
    fetchFlightBillingSearchDate: (data) =>  { dispatch(fetchFlightBillingSearchDate(data)); },
    fetchFlightBillingSearchMonth: (data) =>  { dispatch(fetchFlightBillingSearchMonth(data)); },
    fetchFlightBillingSearchYear: (data) =>  { dispatch(fetchFlightBillingSearchYear(data)); },
  };
};

const mapStateToProps = (state) => {
  return {
    flights: state.FlightReducer.flights,
    flightBillingAll: state.AdminReducer.flightBillingAll,
    flightBillingSearch: state.AdminReducer.flightBillingSearch,
  };
};

const connectedFlightBillingList = connect(mapStateToProps, mapDispatchToProps)(FlightBillingList);
export default connectedFlightBillingList;
