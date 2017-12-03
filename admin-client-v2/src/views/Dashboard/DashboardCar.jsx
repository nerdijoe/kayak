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
    const labels = this.props.carBillingName.slice(0, 10).map((item) => {
      return item._id.name;
    });
    const series = this.props.carBillingName.slice(0, 10).map((item) => {
      return item.total;
    });
    const customDataBar = { labels, series: [series] };

    
    // Dealer City
    const cityLabels = this.props.carBillingCity.map((item) => {
      return item._id;
    });
    const citySeries = this.props.carBillingCity.map((item) => {
      return item.total;
    });
    const cityDataBar = { labels: cityLabels, series: [citySeries] };
    
    



    let totalRevenue = currencyWithNoDecimal(this.props.carBillingCumulative.total);;
    let totalCount = currencyWithNoDecimal(this.props.carBillingCumulative.count);
    let totalDays = currencyWithNoDecimal(this.props.carBillingCumulative.days);
    let averagePrice = currencyWithDecimal(this.props.carBillingCumulative.prices / this.props.carBillingCumulative.count);
    
    

    const monthly = {};
    const monthlyArr = new Array(12);
    const uniqueUsers = {};

    this.props.carBillingAll.map((item) => {
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

    const totalUniqueUsers = currencyWithNoDecimal(Object.keys(uniqueUsers).length);
    console.log('totalRevenue=', totalRevenue);
    console.log('totalCount=', totalCount);
    console.log('totalDays=', totalDays);
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
                        <Col lg={4} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-car text-warning"></i>}
                                statsText="Total Rentals"
                                statsValue={totalCount}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="Updated now"
                            />
                        </Col>
                        <Col lg={4} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-cash text-success"></i>}
                                statsText="Total Revenue"
                                statsValue={totalRevenue}
                                statsIcon={<i className="fa fa-calendar-o"></i>}
                                statsIconText="Last day"
                            />
                        </Col>
                        <Col lg={4} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-date text-danger"></i>}
                                statsText="Days Booked"
                                statsValue={totalDays}
                                statsIcon={<i className="fa fa-clock-o"></i>}
                                statsIconText="In the last hour"
                            />
                        </Col>

                    </Row>
                    <Row>

                      <Col lg={4} sm={6}>
                          <StatsCard
                            bigIcon={<i className="pe-7s-graph1 text-success"></i>}
                            statsText="Average Rental Price"
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
                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="2017 Car Rental"
                                category="All Rental Fees including Taxes"
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
                                title="2017 Car Rental Monthly"
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
                    
                    <Row>
                      <Col md={12}>
                        <Card
                            id="chartActivity"
                            title="Total Revenue by City"
                            category=""
                            stats="Data information certified"
                            statsIcon="fa fa-check"
                            content={
                                <div className="ct-chart">
                                    <ChartistGraph
                                        data={cityDataBar}
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
                                  <th>Total days</th>
                                  <th>Total Revenue</th>
                                </tr>
                              </thead>
                              <tbody>

                                { this.props.carBillingName.slice(0, 10).map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{i+1}</td>
                                      <td>{item._id.name}</td>
                                      <td>{item.days}</td>
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

                <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                  <div key="a">
                    <StatsCard
                      bigIcon={<i className="pe-7s-car text-warning"></i>}
                      statsText="Total Rentals"
                      statsValue={totalCount}
                      statsIcon={<i className="fa fa-refresh"></i>}
                      statsIconText="Updated now"
                    />
                  </div>
                  <div key="b">
                    <StatsCard
                      bigIcon={<i className="pe-7s-wallet text-success"></i>}
                      statsText="Total Revenue"
                      statsValue={totalRevenue}
                      statsIcon={<i className="fa fa-calendar-o"></i>}
                      statsIconText="Last day"
                    />
                  </div>
                  <div key="c">
                    <StatsCard
                      bigIcon={<i className="pe-7s-date text-danger"></i>}
                      statsText="Days Booked"
                      statsValue={totalDays}
                      statsIcon={<i className="fa fa-clock-o"></i>}
                      statsIconText="In the last hour"
                    />
                  </div>
                </ReactGridLayout>

                <ResponsiveReactGridLayout className="layout"
                  breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                  cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
                  <div key="1">
                    <StatsCard
                      bigIcon={<i className="pe-7s-car text-warning"></i>}
                      statsText="Total Rentals"
                      statsValue={totalCount}
                      statsIcon={<i className="fa fa-refresh"></i>}
                      statsIconText="Updated now"
                    />
                  </div>
                  <div key="2">
                    <StatsCard
                      bigIcon={<i className="pe-7s-wallet text-success"></i>}
                      statsText="Total Revenue"
                      statsValue={totalRevenue}
                      statsIcon={<i className="fa fa-calendar-o"></i>}
                      statsIconText="Last day"
                    />
                  </div>
                  <div key="3">
                    <StatsCard
                      bigIcon={<i className="pe-7s-date text-danger"></i>}
                      statsText="Days Booked"
                      statsValue={totalDays}
                      statsIcon={<i className="fa fa-clock-o"></i>}
                      statsIconText="In the last hour"
                    />
                  </div>
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    carBillingAll: state.AdminReducer.carBillingAll,
    carBillingCount: state.AdminReducer.carBillingCount,
    carBillingTotal: state.AdminReducer.carBillingTotal,
    carBillingCumulative: state.AdminReducer.carBillingCumulative,
    carBillingName: state.AdminReducer.carBillingName,
    carBillingCity: state.AdminReducer.carBillingCity,
  };
};

const connectedDashboard = connect(mapStateToProps, null)(Dashboard);

export default connectedDashboard;
