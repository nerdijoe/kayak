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
    // 2017 Flight Revenue
    const labels = this.props.flightBillingName.slice(0, 10).map((item) => {
      return item._id.name;
    });
    const series = this.props.flightBillingName.slice(0, 10).map((item) => {
      return item.total;
    });

    const customDataBar = { labels, series: [series] };


    // Departure City Frequencies
    const depCityLabels = this.props.flightBillingDepCity.map((item) => {
      return item._id;
    });
    const depCitySeries = this.props.flightBillingDepCity.map((item) => {
      return item.count;
    });
    const depCityDataBar = { labels: depCityLabels, series: [depCitySeries] };

    // Arrival City Frequencies
    const arrCityLabels = this.props.flightBillingArrCity.map((item) => {
      return item._id;
    });
    const arrCitySeries = this.props.flightBillingArrCity.map((item) => {
      return item.count;
    });
    const arrCityDataBar = { labels: arrCityLabels, series: [arrCitySeries] };

    // Pie Chart
    const classLegendNames = this.props.flightBillingClass.map((item) => {
      return item._id;
    });
    
    const classLabels = this.props.flightBillingClass.map((item) => {
      return `${currencyWithNoDecimal((item.count/ this.props.flightBillingCumulative.count) * 100)}%`;
    });

    const classSeries = this.props.flightBillingClass.map((item) => {
      return ((item.count/ this.props.flightBillingCumulative.count));
    });
    console.log('classSeries', classSeries);
    const classDataPie = {
      labels: classLabels,
      series: classSeries
    };
    const classLegendPie = {
      names: classLegendNames,
      types: ["info","danger","warning"]
    };




    console.log('flightBillingCumulative=', this.props.flightBillingCumulative);

    let totalRevenue = currencyWithNoDecimal(this.props.flightBillingCumulative.total);

    let totalCount = this.props.flightBillingCumulative.count;
    let totalDays = 0
    let totalSeats = this.props.flightBillingCumulative.seats;
    let averagePrice = currencyWithDecimal(this.props.flightBillingCumulative.prices / this.props.flightBillingCumulative.count);




    const monthly = {};
    const monthlyArr = new Array(12);
    const uniqueUsers = {};

    this.props.flightBillingAll.map((item) => {
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
    console.log('totalSeats=', totalSeats);
    console.log('averagePrice=', averagePrice);

    console.log('uniqueUsers=', uniqueUsers);
    console.log('uniqueUsers total=', totalUniqueUsers);
    console.log('monthly =', monthly);
    console.log('monthlyArr =', monthlyArr);
    const dataBarMonthly = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
                        <Col lg={4} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-ticket text-warning"></i>}
                                statsText="Transaction Count"
                                statsValue={totalCount}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="In the last hour"
                            />
                        </Col>
                        <Col lg={4} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-cash text-success"></i>}
                                statsText="Total Revenue"
                                statsValue={totalRevenue}
                                statsIcon={<i className="fa fa-calendar-o"></i>}
                                statsIconText="in USD"
                            />
                        </Col>

                    </Row>

                    <Row>
                      <Col lg={4} sm={6}>
                          <StatsCard
                            bigIcon={<i className="pe-7s-ticket text-info"></i>}
                            statsText="Tickets Sold"
                            statsValue={totalSeats}
                            statsIcon={<i className="fa fa-calendar-o"></i>}
                            statsIconText="In the last hour"
                          />
                      </Col>
                      <Col lg={4} sm={6}>
                          <StatsCard
                            bigIcon={<i className="pe-7s-graph1 text-success"></i>}
                            statsText="Average Ticket Price"
                            statsValue={averagePrice}
                            statsIcon={<i className="fa fa-calendar-o"></i>}
                            statsIconText="in USD"
                          />
                      </Col>
                      <Col lg={4} sm={6}>
                            <StatsCard
                                bigIcon={<i className="fa pe-7s-smile text-info"></i>}
                                statsText="Unique Users"
                                statsValue={totalUniqueUsers}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="In the last hour"
                            />
                        </Col>

                    </Row>

                    <Row>
                      <Col md={3}>
                      </Col>
                      <Col md={6}>
                        <Card
                            statsIcon="fa fa-clock-o"
                            title="Seat Class Booked"
                            category=""
                            stats="In the last hour"
                            content={
                                <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                                    <ChartistGraph data={classDataPie} type="Pie"/>
                                </div>
                            }
                            legend={
                                <div className="legend">
                                    {this.createLegend(classLegendPie)}
                                </div>
                            }
                        />

                      </Col>
                      <Col md={3}>
                      </Col>
                    </Row>


                    <Row>
                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="2017 Flight Revenue By Airlines"
                                category="Taxes included"
                                stats="Data information certified"
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={customDataBar}
                                            type="Line"
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
                                title="2017 Flight Revenue Monthly"
                                category="Taxes included"
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

                    <Row>
                      <Col md={12}>
                        <Card
                            id="chartActivity"
                            title="Departure City Frequencies"
                            category=""
                            stats="Data information certified"
                            statsIcon="fa fa-check"
                            content={
                                <div className="ct-chart">
                                    <ChartistGraph
                                        data={depCityDataBar}
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
                            title="Destination City Frequencies"
                            category=""
                            stats="Data information certified"
                            statsIcon="fa fa-check"
                            content={
                                <div className="ct-chart">
                                    <ChartistGraph
                                        data={arrCityDataBar}
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
                          title="Top 10 Revenue By Airlines"
                          category="Taxes included"
                          stats="Data information certified"
                          statsIcon="fa fa-check"
                          content={
                            <Table striped bordered condensed hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Hotel</th>
                                  <th>Tickets Sold</th>
                                  <th>Total Revenue</th>
                                </tr>
                              </thead>
                              <tbody>

                                { this.props.flightBillingName.slice(0, 10).map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{i+1}</td>
                                      <td>{item._id.name}</td>
                                      <td>{item.seats}</td>
                                      <td>{currencyWithNoDecimal(item.total)}</td>
                                    </tr>
                                  );
                                })}

                              </tbody>
                            </Table>
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
    hotelBillingAll: state.AdminReducer.hotelBillingAll,
    hotelBillingCustom: state.AdminReducer.hotelBillingCustom,
    hotelBillingName: state.AdminReducer.hotelBillingName,
    hotelBillingCity: state.AdminReducer.hotelBillingCity,
    hotelBillingCumulative: state.AdminReducer.hotelBillingCumulative,
    flightBillingAll: state.AdminReducer.flightBillingAll,
    flightBillingCumulative: state.AdminReducer.flightBillingCumulative,
    flightBillingName: state.AdminReducer.flightBillingName,
    flightBillingDepAirport: state.AdminReducer.flightBillingDepAirport,
    flightBillingDepCity: state.AdminReducer.flightBillingDepCity,
    flightBillingArrAirport: state.AdminReducer.flightBillingArrAirport,
    flightBillingArrCity: state.AdminReducer.flightBillingArrCity,
    flightBillingClass: state.AdminReducer.flightBillingClass,
    flightBillingCustom: state.AdminReducer.flightBillingCustom,
  };
};

const connectedDashboard = connect(mapStateToProps, null)(Dashboard);

export default connectedDashboard;
