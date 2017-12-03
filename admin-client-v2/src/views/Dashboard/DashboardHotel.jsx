import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import {
  Grid,
  Row,
  Col,
  Table,
  ProgressBar,
} from 'react-bootstrap';

import { connect } from 'react-redux';
import Moment from 'moment';
import ReactGridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';

import {Card} from 'components/Card/Card.jsx';
import {StatsCard} from 'components/StatsCard/StatsCard.jsx';
import {Tasks} from 'components/Tasks/Tasks.jsx';
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    optionsBar,
    responsiveBar,
    legendBar
} from 'variables/VariablesKayak.jsx';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Dashboard extends Component {
    createLegend(json){
        var legend = [];
        for(var i = 0; i < json["names"].length; i++){
            var type = "fa fa-circle text-"+json["types"][i];
            legend.push(
                <i className={type} key={i}></i>
            );
            legend.push(" ");
            legend.push(
                json["names"][i]
            );
        }
        return legend;
    }
    render() {
    const labels = this.props.hotelBillingName.map((item) => {
      return item._id;
    });
    const series = this.props.hotelBillingName.map((item) => {
      return item.total;
    });

    const customDataBar = { labels, series: [series] };

    console.log('hotelBillingCumulative=', this.props.hotelBillingCumulative);

    let totalRevenue = this.props.hotelBillingCumulative.total;
    let totalCount = this.props.hotelBillingCumulative.count;
    let totalDays = this.props.hotelBillingCumulative.days;
    let totalRooms = this.props.hotelBillingCumulative.rooms;
    let averagePrice = this.props.hotelBillingCumulative.prices / this.props.hotelBillingCumulative.count;

    const monthly = {};
    const monthlyArr = new Array(12);
    const uniqueUsers = {};

    this.props.hotelBillingAll.map((item) => {
      let month = parseInt(Moment(item.createdAt).format('L').slice(0,2));
      console.log('    moment formatted=', Moment(item.createdAt).format('L'));
      console.log('    month=', month)
      let amount = item.totalAmount;
      // totalRevenue += amount;
      // totalRentalsDays += item.daysBooked;
      if(monthly.hasOwnProperty(month)) {
        monthly[month] += amount;
        monthlyArr[month-1] += amount;
      } else {
        monthly[month] = amount;
        monthlyArr[month-1] = amount;
      }

      if(uniqueUsers.hasOwnProperty(item.userId)){
        uniqueUsers[item.userId] += 1;
      } else {
        uniqueUsers[item.userId] = 1;
      }
    });

    const totalUniqueUsers = Object.keys(uniqueUsers).length;
    console.log('totalRevenue=', totalRevenue);
    console.log('totalCount=', totalCount);
    console.log('totalDays=', totalDays);
    console.log('totalRooms=', totalRooms);
    console.log('averagePrice=', averagePrice);

    console.log('uniqueUsers=', uniqueUsers);
    console.log('uniqueUsers total=', totalUniqueUsers);
    console.log('monthly =', monthly);
    console.log('monthlyArr =', monthlyArr);
    const dataBarMonthly = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        monthlyArr,
        []
      ],
    };

    console.log('customDataBar=', customDataBar);

    const layout = [
      {i: 'a', x: 0, y: 0, w: 2, h: 2},
      {i: 'b', x: 2, y: 1, w: 2, h: 2},
      {i: 'c', x: 4, y: 0, w: 2, h: 2}
    ];


        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-car text-warning"></i>}
                                statsText="Total Bookings"
                                statsValue={totalCount}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="Updated now"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-wallet text-success"></i>}
                                statsText="Total Revenue"
                                statsValue={totalRevenue}
                                statsIcon={<i className="fa fa-calendar-o"></i>}
                                statsIconText="Last day"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-date text-danger"></i>}
                                statsText="Days Booked"
                                statsValue={totalDays}
                                statsIcon={<i className="fa fa-clock-o"></i>}
                                statsIconText="In the last hour"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="fa fa-twitter text-info"></i>}
                                statsText="Unique Users"
                                statsValue={totalUniqueUsers}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="Updated now"
                            />
                        </Col>
                    </Row>

                    <Row>
                      <Col lg={3} sm={6}>
                          <StatsCard
                            bigIcon={<i className="pe-7s-wallet text-success"></i>}
                            statsText="Total Rooms"
                            statsValue={totalRooms}
                            statsIcon={<i className="fa fa-calendar-o"></i>}
                            statsIconText="Last day"
                          />
                      </Col>
                      <Col lg={3} sm={6}>
                          <StatsCard
                            bigIcon={<i className="pe-7s-wallet text-success"></i>}
                            statsText="Average Room Price"
                            statsValue={averagePrice}
                            statsIcon={<i className="fa fa-calendar-o"></i>}
                            statsIconText="Last day"
                          />
                      </Col>

                    </Row>

                    <Row>

                    <Row>
                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="2017 Hotel Revenue"
                                category="Taxex included"
                                stats="Data information certified"
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={customDataBar}
                                            type="Bar"
                                            options={optionsBar}
                                            responsiveOptions={responsiveBar}
                                        />
                                    </div>
                                }
                                // legend={
                                //     <div className="legend">
                                //         {this.createLegend(legendBar)}
                                //     </div>
                                // }
                            />
                        </Col>

                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="2017 Hotel Revenue Monthly"
                                category="All Rental Fees including Taxes"
                                stats="Data information certified"
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={dataBarMonthly}
                                            type="Bar"
                                            options={optionsBar}
                                            responsiveOptions={responsiveBar}
                                        />
                                    </div>
                                }
                                // legend={
                                //     <div className="legend">
                                //         {this.createLegend(legendBar)}
                                //     </div>
                                // }
                            />
                        </Col>

                    </Row>
                    </Row>

                    <Row>
                      <h3>Top 10 </h3>
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Hotel</th>
                            <th>Total Bookings</th>
                            <th>Total Revenue</th>
                          </tr>
                        </thead>
                        <tbody>

                          { this.props.hotelBillingName.slice(0, 10).map((item, i) => {
                            return (
                              <tr key={i}>
                                <td>{i+1}</td>
                                <td>{item._id}</td>
                                <td>{item.count}</td>
                                <td>{item.total}</td>
                              </tr>
                            );
                          })}

                        </tbody>
                      </Table>
                    </Row>
                </Grid>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    carBillingAll: state.AdminReducer.carBillingAll,
    carBillingCount: state.AdminReducer.carBillingCount,
    carBillingTotal: state.AdminReducer.carBillingTotal,
    hotelBillingAll: state.AdminReducer.hotelBillingAll,
    hotelBillingCustom: state.AdminReducer.hotelBillingCustom,
    hotelBillingName: state.AdminReducer.hotelBillingName,
    hotelBillingCity: state.AdminReducer.hotelBillingCity,
    hotelBillingCumulative: state.AdminReducer.hotelBillingCumulative,
    
  };
};

const connectedDashboard = connect(mapStateToProps, null)(Dashboard);

export default connectedDashboard;
