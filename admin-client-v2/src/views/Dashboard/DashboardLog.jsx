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
    legendBar,
} from 'variables/VariablesKayak.jsx';

import {
  currencyWithNoDecimal,
  currencyWithDecimal,
} from 'helpers/Currency';

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

    const labels = this.props.logPagesCount.map((item) => {
      return item._id;
    });
    const series = this.props.logPagesCount.map((item) => {
      return item.count;
    });
    const customDataBar = { labels, series: [series] };
    
    // Class Type
    const classLabels = this.props.logSearchesClassType.map((item) => {
      return item._id;
    });
    const classSeries = this.props.logSearchesClassType.map((item) => {
      return item.count;
    });
    const classDataBar = { labels: classLabels, series: [classSeries] };



    let totalRevenue = 0;
    let totalRentals = this.props.logPages.length;
    let totalRentalsDays = 0;
    console.log('--------this.props.logPagesCount=', this.props.logPagesCount);

    console.log('--------customDataBar=', customDataBar);

    const monthly = {};
    const monthlyArr = {};
    const uniqueUsers = {};
    const listUrl = {};
    this.props.logPages.map((item) => {
      // let month = parseInt(Moment(item.createdAt).format('L').slice(0,2));
      let url = item.url;
      // console.log('    moment formatted=', Moment(item.createdAt).format('L'));
      // console.log('    month=', month)

      if(listUrl.hasOwnProperty(url)) {

        let nonuser = 0;
        let user = 0;
        if(item.userId === 0) {
          nonuser = 1;
        }
        else {
          user = 1;
        }
        listUrl[url]['nonuser'] += nonuser;
        listUrl[url]['user'] += user;
        
      } else {
        let nonuser = 0;
        let user = 0;
        if(item.userId === 0) {
          nonuser = 1;
        } else {
          user = 1;
        }

        listUrl[url] = {
          nonuser,
          user,
        };
      }

      if(uniqueUsers.hasOwnProperty(item.userId)){
        uniqueUsers[item.userId] += 1;
      } else {
        uniqueUsers[item.userId] = 1;
      }
    });


    // vs chart
    const vsSeries = this.props.logPagesCount.map((item) => {
      return item.count;
    });
    

    let vsLabels = []
    let nonuserCount = [];
    let userCount = [];

    console.log('listUrl=', listUrl);
    Object.keys(listUrl).forEach(function(key) {
      var val = listUrl[key];
      console.log(`[${key}]=[${val.nonuser}],[${val.user}]`);
      nonuserCount.push(listUrl[key].nonuser);
      userCount.push(listUrl[key].user);
      vsLabels.push(key);

    });
    console.log(`user=${userCount}, nonuser=${nonuserCount}`);
    console.log('vsLabels=', vsLabels);

    const vsDataBar = { labels: vsLabels, series: [userCount, nonuserCount] };

    var vsLegendBar = {
      names: ["Registered Users","Anonymous Users"],
      types: ["info","danger"]
    };
  
    // -----------

    const totalUniqueUsers = currencyWithNoDecimal(Object.keys(uniqueUsers).length);

    console.log('totalRevenue=', totalRevenue);
    console.log('totalRentals=', totalRentals);
    console.log('totalRentalsDays=', totalRentalsDays);
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

    // search Type
    const searchTypelabels = this.props.logSearchesType.map((item) => {
      return item._id;
    });
    const searchTypeSeries = this.props.logSearchesType.map((item) => {
      return item.count;
    });

    const searchTypeDataBar = { labels: searchTypelabels, series: [searchTypeSeries] };



        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-mouse text-warning"></i>}
                                statsText="Total Pages Clicks"
                                statsValue={totalRentals}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="Updated now"
                            />
                        </Col>
                        {/* <Col lg={3} sm={6}>
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
                                statsValue={totalRentalsDays}
                                statsIcon={<i className="fa fa-clock-o"></i>}
                                statsIconText="In the last hour"
                            />
                        </Col> */}
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

                    <Row>
                        <Col md={12}>
                            <Card
                                id="chartActivity"
                                title="Total Clicks per Page"
                                category="Including sign-in and anynomouse users"
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
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card
                                id="chartActivity"
                                title="2017 Total Clicks Registered users vs Anonymous users"
                                category="Including sign-in and anynomouse users"
                                stats="Data information certified"
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={vsDataBar}
                                            type="Bar"
                                            options={optionsBar}
                                            responsiveOptions={responsiveBar}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">
                                        {this.createLegend(vsLegendBar)}
                                    </div>
                                }
                            />
                        </Col>

                    </Row>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="Total Searches"
                                category="Including sign-in and anynomouse users"
                                stats="Data information certified"
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={searchTypeDataBar}
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

                    <Row>
                      <Col md={12}>
                        <Card
                          id="chartActivity"
                          title="Car Search By Keywords"
                          category="Taxes included"
                          stats="Data information certified"
                          statsIcon="fa fa-check"
                          content={
                            <Table striped bordered condensed hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>City Search keywords</th>
                                  <th>progressive bar</th>
                                  <th>Count</th>
                                </tr>
                              </thead>
                              <tbody>

                                { this.props.logSearchesDealerCity.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{i+1}</td>
                                      <td>{item._id}</td>
                                      <td><ProgressBar bsStyle="info" now={item.count} /></td>
                                      <td>{item.count}</td>
                                    </tr>
                                  );
                                })}

                              </tbody>
                            </Table>
                          }

                          />
                        </Col>

                    </Row>

                    <Row>
                      <Col md={12}>
                        <Card
                          id="chartActivity"
                          title="Hotel Search By Keywords"
                          category="Taxes included"
                          stats="Data information certified"
                          statsIcon="fa fa-check"
                          content={
                            <Table striped bordered condensed hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Hotel Search keywords</th>
                                  <th>progressive bar</th>
                                  <th>Count</th>
                                </tr>
                              </thead>
                              <tbody>

                                { this.props.logSearchesHotelCity.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{i+1}</td>
                                      <td>{item._id}</td>
                                      <td><ProgressBar bsStyle="info" now={item.count} /></td>
                                      <td>{item.count}</td>
                                    </tr>
                                  );
                                })}

                              </tbody>
                            </Table>
                          }

                          />
                        </Col>
                      </Row>

                      <Row>
                      <Col md={12}>
                        <Card
                          id="chartActivity"
                          title="Flight Search Departure City"
                          category="Taxes included"
                          stats="Data information certified"
                          statsIcon="fa fa-check"
                          content={
                            <Table striped bordered condensed hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Departure City keywords</th>
                                  <th>progressive bar</th>
                                  <th>Count</th>
                                </tr>
                              </thead>
                              <tbody>

                                { this.props.logSearchesAirportA.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{i+1}</td>
                                      <td>{item._id}</td>
                                      <td><ProgressBar bsStyle="info" now={item.count} /></td>
                                      <td>{item.count}</td>
                                    </tr>
                                  );
                                })}

                              </tbody>
                            </Table>
                          }

                          />
                        </Col>
                      </Row>

                      <Row>
                      <Col md={12}>
                        <Card
                          id="chartActivity"
                          title="Flight Search Destination City"
                          category="Taxes included"
                          stats="Data information certified"
                          statsIcon="fa fa-check"
                          content={
                            <Table striped bordered condensed hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Destination City keywords</th>
                                  <th>progressive bar</th>
                                  <th>Count</th>
                                </tr>
                              </thead>
                              <tbody>

                                { this.props.logSearchesAirportB.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{i+1}</td>
                                      <td>{item._id}</td>
                                      <td><ProgressBar bsStyle="info" now={item.count} /></td>
                                      <td>{item.count}</td>
                                    </tr>
                                  );
                                })}

                              </tbody>
                            </Table>
                          }

                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="Total Search by Seat Class"
                                category="For all users"
                                stats="Data information certified"
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={classDataBar}
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
    logPages: state.AdminReducer.logPages,
    logPagesCount: state.AdminReducer.logPagesCount,
    logSearches: state.AdminReducer.logSearches,
    logSearchesType: state.AdminReducer.logSearchesType,
    logSearchesDealerCity: state.AdminReducer.logSearchesDealerCity,
    logSearchesHotelCity: state.AdminReducer.logSearchesHotelCity,
    logSearchesAirportA: state.AdminReducer.logSearchesAirportA,
    logSearchesAirportB: state.AdminReducer.logSearchesAirportB,
    logSearchesSeats: state.AdminReducer.logSearchesSeats,
    logSearchesClassType: state.AdminReducer.logSearchesClassType,
    logSearchesRooms: state.AdminReducer.logSearchesRooms,
    logSearchesGuests: state.AdminReducer.logSearchesGuests,
  };
};

const connectedDashboard = connect(mapStateToProps, null)(Dashboard);

export default connectedDashboard;
