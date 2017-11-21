import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Modal,
  OverlayTrigger,
  Popover,
  Tooltip,
  Row,
  Col,
} from 'react-bootstrap';

import {
  axiosAddNewCar,
} from '../../actions';

import CarNewForm from './CarNewForm';

class CarList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }
  getInitialState() {
    return { showModal: false };
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    console.log('open');
    this.setState({ showModal: true });
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
            <Button bsStyle="success" pullRight bsSize="large" onClick={() => this.openModal() }>Add New Car</Button>
          </Col>
        </Row>



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
              this.props.cars.map((car) => {
                return (
                  <tr key={car._id}>
                    <td>{car.dealer.name}</td>
                    <td>{car.type}</td>
                    <td>{car.make}</td>
                    <td>{car.model}</td>
                    <td>{car.price}</td>
                    <td>{car.doorNumber}</td>
                    <td>{car.capacity}</td>
                    <td><Button bsStyle="info">edit</Button></td>
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

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    axiosAddNewCar: (data) => { dispatch(axiosAddNewCar(data)); },
  };
};

const mapStateToProps = (state) => {
  return {
    cars: state.CarReducer.cars,
  };
};

const connectedCarList = connect(mapStateToProps, mapDispatchToProps)(CarList);
export default connectedCarList;
