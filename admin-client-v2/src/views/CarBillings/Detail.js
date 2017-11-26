import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  ListGroup,
  ListGroupItem,
  Panel,
} from 'react-bootstrap';
import Moment from 'moment';

import {Card} from 'components/Card/Card.jsx';


class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        profileImage: '',
        creditCardNum: '',
        creditCardFullName: '',
      },
    };
  }
  componentDidMount() {
    console.log('componentDidMount');
    console.log('  this.props.detailBilling=', this.props.detailBilling);

    // let user = {};
    const pos = this.props.users.findIndex(i => i.id === this.props.detailBilling.userId);
    console.log('  pos=', pos);
    if (pos !== -1) {
      // user = this.props.users[pos];
      this.setState({ user: this.props.users[pos] });
    }

    console.log('   this.props.users[pos]=', this.props.users[pos]);
  }

  render() {

    return (
      <div>
        <Card
          id="carBilling"
          title="Car Billing Detail"
          category="some text here"
          stats="Data information certified"
          statsIcon="fa fa-check"
          content={
            <div>
              <ListGroup>
              <ListGroupItem header="Rental details" >
                <Table striped bordered condensed hover>
                  <tbody>
                    <tr>
                      <td>Car Billing id</td>
                      <td>{this.props.detailBilling._id}</td>
                    </tr>
                    <tr>
                      <td>Days Booked</td>
                      <td>{this.props.detailBilling.daysBooked}</td>
                    </tr>
                    <tr>
                      <td>Price Booked</td>
                      <td>${this.props.detailBilling.priceBooked}/day</td>
                    </tr>
                    <tr>
                      <td>Total Amount</td>
                      <td>${this.props.detailBilling.totalAmount}</td>
                    </tr>
                    <tr>
                      <td>Rental date</td>
                      <td>{Moment(this.props.detailBilling.startDate).format('L')} - {Moment(this.props.detailBilling.endDate).format('L')}</td>
                    </tr>
                    <tr>
                      <td>Billing date</td>
                      <td>{Moment(this.props.detailBilling.createdAt).format('L')}</td>
                    </tr>
                  </tbody>
                </Table>
              </ListGroupItem>
              <ListGroupItem header="User">
                <Table striped bordered condensed hover>
                  <tbody>
                    <tr>
                      <td>id</td>
                      <td>{this.state.user.id}</td>
                    </tr>
                    <tr>
                      <td>Full Name</td>
                      <td>{this.state.user.firstName} {this.state.user.lastName}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{this.state.user.email}</td>
                    </tr>
                  </tbody>
                </Table>
              </ListGroupItem>
              <ListGroupItem header="Dealer">
                <Table striped bordered condensed hover>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>{this.props.detailBilling.dealer.name}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>
                      <p>{this.props.detailBilling.dealer.address}</p>
                      <p>{this.props.detailBilling.dealer.city}, {this.props.detailBilling.dealer.state} {this.props.detailBilling.dealer.zipcode}</p>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </ListGroupItem>
              <ListGroupItem header="Car">
                <Table striped bordered condensed hover>
                  <tbody>
                    <tr>
                      <td>Type</td>
                      <td>{this.props.detailBilling.car.type}</td>
                    </tr>
                    <tr>
                      <td>Make</td>
                      <td>{this.props.detailBilling.car.make}</td>
                    </tr>
                    <tr>
                      <td>Model</td>
                      <td>{this.props.detailBilling.car.model}</td>
                    </tr>
                    <tr>
                      <td>description</td>
                      <td>{this.props.detailBilling.car.description}</td>
                    </tr>
                    <tr>
                      <td>Door Number</td>
                      <td>{this.props.detailBilling.car.doorNumber}</td>
                    </tr>
                    <tr>
                      <td>Capacity</td>
                      <td>{this.props.detailBilling.car.capacity}</td>
                    </tr>
                  </tbody>
                </Table>              
              </ListGroupItem>

              </ListGroup>
            </div>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.UserReducer.users,
  };
};

const connectedDetail = connect(mapStateToProps, null)(Detail);

export default connectedDetail;
