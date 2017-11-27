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
  axiosAddNewCar,
  axiosDeleteCar,
  fetchCarBillingSearchDate,
  fetchCarBillingSearchMonth,
  fetchCarBillingSearchYear,
} from '../../actions';

import CarNewForm from './NewForm';
import CarEditForm from './EditForm';
import Detail from './Detail';


class CarBillingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      editModal: false,
      deleteModal: false,
      detailModal: false,
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
      detailBilling: {
        dealer: { name: ''},
        type: '',
        make: '',
        model: '',
        price: '',
        doorNumber: '',
        capacity: '',
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
      // billingData: this.props.carBillingAll,
    };
  }


  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    // this.setState({ billingData: this.props.carBillingAll });
    this.billingData = this.props.carBillingAll;
    console.log('componentDidMount this.props.carBillingAll=', this.props.carBillingAll);
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

  closeDetailModal() {
    this.setState({ detailModal: false });
  }

  openDetailModal(car) {
    console.log('open');
    this.setState({ detailModal: true });
    this.setState({ detailBilling: car });
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

  handleChange(date) {
    this.setState({
      startDate: date
    });

    // if(date) {
    //   console.log('   date = ', Moment(date).format('L'));
    //   let arr = this.props.carBillingAll.filter((item) => {
    //     console.log(`${item.createdAt}-->`, Moment(item.createdAt).format('L'));
    //     return Moment(item.createdAt).format('L') === Moment(date).format('L');
    //   })
  
    //   console.log('------------ arr=', arr);
    //   this.setState({ billingData: arr });
    // }
    // else {
    //   this.setState({ billingData: this.props.carBillingAll});
    // }
    if (this.state.searchType === 'date') {
      this.props.fetchCarBillingSearch(date);
    } else if (this.state.searchType === 'month') {
      this.props.fetchCarBillingSearchMonth(date);
    } else {
      this.props.fetchCarBillingSearchYear(date);
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
              <th>Dealer</th>
              <th>Booking Days</th>
              <th>Price/day</th>
              <th>Total</th>
              <th>Booked date</th>
              <th>Action</th>
              </tr>
          </thead>
          <tbody>
            {
              this.props.carBillingSearch.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.dealer.name}</td>
                    <td>{item.daysBooked}</td>
                    <td>{item.priceBooked}</td>
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
            <Detail editCarData={this.state.editCarData} />

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
    axiosAddNewCar: (data) => { dispatch(axiosAddNewCar(data)); },
    axiosDeleteCar: (data) => { dispatch(axiosDeleteCar(data)); },
    fetchCarBillingSearchDate: (data) =>  { dispatch(fetchCarBillingSearchDate(data)); },
    fetchCarBillingSearchMonth: (data) =>  { dispatch(fetchCarBillingSearchMonth(data)); },
    fetchCarBillingSearchYear: (data) =>  { dispatch(fetchCarBillingSearchYear(data)); },
  };
};

const mapStateToProps = (state) => {
  return {
    cars: state.CarReducer.cars,
    carBillingAll: state.AdminReducer.carBillingAll,
    carBillingSearch: state.AdminReducer.carBillingSearch,
  };
};

const connectedCarBillingList = connect(mapStateToProps, mapDispatchToProps)(CarBillingList);
export default connectedCarBillingList;
