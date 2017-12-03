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
          id="hotelBilling"
          title="Hotel Billing Detail"
          category=""
          stats="Data information certified"
          statsIcon="fa fa-check"
          content={
            <div>
              <ListGroup>
              <ListGroupItem header="Booked details" >
                <Table striped bordered condensed hover>
                  <tbody>
                    <tr>
                      <td>Hotel Billing id</td>
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
                      <td>Booked date</td>
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
              <ListGroupItem header="Hotel">
                <Table striped bordered condensed hover>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>{this.props.detailBilling.hotel.name}</td>
                    </tr>
                    <tr>
                      <td>Stars</td>
                      <td>{this.props.detailBilling.hotel.stars}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>
                        <p>{this.props.detailBilling.hotel.address}</p>
                        <p>{this.props.detailBilling.hotel.city}, {this.props.detailBilling.hotel.state} {this.props.detailBilling.hotel.zipcode}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>description</td>
                      <td>{this.props.detailBilling.hotel.description}</td>
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
