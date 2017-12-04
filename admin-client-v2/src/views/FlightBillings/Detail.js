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
          id="flightBilling"
          title="Flight Billing Detail"
          category=""
          stats="Data information certified"
          statsIcon="fa fa-check"
          content={
            <div>
              <ListGroup>
              <ListGroupItem header="Flight details" >
                <Table striped bordered condensed hover>
                  <tbody>
                    <tr>
                      <td>Flight Billing id</td>
                      <td>{this.props.detailBilling._id}</td>
                    </tr>
                    <tr>
                    <td>Flight Number</td>
                    <td>{this.props.detailBilling.flightNumber}</td>
                    </tr>
                    <tr>
                    <td>Airline</td>
                    <td>{this.props.detailBilling.airline.name}</td>
                    </tr>
                    <tr>
                    <td>Departure Airport</td>
                    <td>{this.props.detailBilling.departureAirport.name}</td>
                    </tr>
                    <tr>
                    <td>Arrival Airport</td>
                    <td>{this.props.detailBilling.arrivalAirport.name}</td>
                    </tr>
                    <tr>
                    <td>Departure Time</td>
                    <td>{Moment(this.props.detailBilling.departureTime).format('L LT')}</td>
                    </tr>
                    <tr>
                    <td>Arrival Time</td>
                    <td>{Moment(this.props.detailBilling.arrivalTime).format('L LT')}</td>
                    </tr>
                    <tr>
                    <td>Class Type</td>
                    <td>{this.props.detailBilling.classBooked}</td>
                    </tr>
                    <tr>
                      <td>Quantity Booked</td>
                      <td>{this.props.detailBilling.qtyBooked}</td>
                    </tr>
                    <tr>
                      <td>Price Booked</td>
                      <td>${this.props.detailBilling.priceBooked}</td>
                    </tr>
                    <tr>
                      <td>Total Amount</td>
                      <td>${this.props.detailBilling.totalAmount}</td>
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
              {/*<ListGroupItem header="Airline">
                <Table striped bordered condensed hover>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>{this.props.detailBilling.airline.name}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>
                      <p>{this.props.detailBilling.airline.address}</p>
                      <p>{this.props.detailBilling.airline.city}, {this.props.detailBilling.airline.state} {this.props.detailBilling.airline.zipcode}</p>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </ListGroupItem>*/}
              <ListGroupItem header="DepartureAirport">
                  <Table striped bordered condensed hover>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{this.props.detailBilling.departureAirport.name}</td>
                      </tr>
                      <tr>
                      <td>Address</td>
                        <td>
                          <p>{this.props.detailBilling.departureAirport.address}</p>
                          <p>{this.props.detailBilling.departureAirport.city}, {this.props.detailBilling.departureAirport.state} {this.props.detailBilling.departureAirport.country}</p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
              </ListGroupItem>
              <ListGroupItem header="ArrivalAirport">
                  <Table striped bordered condensed hover>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{this.props.detailBilling.arrivalAirport.name}</td>
                      </tr>
                      <tr>
                      <td>Address</td>
                        <td>
                          <p>{this.props.detailBilling.arrivalAirport.address}</p>
                          <p>{this.props.detailBilling.arrivalAirport.city}, {this.props.detailBilling.arrivalAirport.state} {this.props.detailBilling.arrivalAirport.country}</p>
                        </td>
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
