import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';
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
    const labels = this.props.logPagesCount.map((item) => {
      return item._id;
    });
    const series = this.props.logPagesCount.map((item) => {
      return item.count;
    });

    let totalRevenue = 0;
    let totalRentals = this.props.logPages.length;
    let totalRentalsDays = 0;
    const customDataBar = { labels, series: [series] };
    console.log('--------this.props.logPagesCount=', this.props.logPagesCount);

    console.log('--------customDataBar=', customDataBar);

    const monthly = {};
    const monthlyArr = new Array(12);
    const uniqueUsers = {};

    // this.props.carBillingAll.map((item) => {
    //   let month = parseInt(Moment(item.createdAt).format('L').slice(0,2));
    //   console.log('    moment formatted=', Moment(item.createdAt).format('L'));
    //   console.log('    month=', month)
    //   let amount = item.totalAmount;
    //   totalRevenue += amount;
    //   totalRentalsDays += item.daysBooked;
    //   if(monthly.hasOwnProperty(month)) {
    //     monthly[month] += amount;
    //     monthlyArr[month-1] += amount;
    //   } else {
    //     monthly[month] = amount;
    //     monthlyArr[month-1] = amount;
    //   }

    //   if(uniqueUsers.hasOwnProperty(item.userId)){
    //     uniqueUsers[item.userId] += 1;
    //   } else {
    //     uniqueUsers[item.userId] = 1;
    //   }
    // });

    this.props.logPages.map((item) => {
      let month = parseInt(Moment(item.createdAt).format('L').slice(0,2));
      console.log('    moment formatted=', Moment(item.createdAt).format('L'));
      console.log('    month=', month)
      let amount = 1;
      totalRevenue += amount;

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
                        <Col md={6}>
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

                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="2017 Total Clicks"
                                category="Including sign-in and anynomouse users"
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

                </Grid>

                <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                  <div key="a">
                    <StatsCard
                      bigIcon={<i className="pe-7s-car text-warning"></i>}
                      statsText="Total Rentals"
                      statsValue={totalRentals}
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
                      statsValue={totalRentalsDays}
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
                      statsValue={totalRentals}
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
                      statsValue={totalRentalsDays}
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
    logPages: state.AdminReducer.logPages,
    logPagesCount: state.AdminReducer.logPagesCount,
};
};

const connectedDashboard = connect(mapStateToProps, null)(Dashboard);

export default connectedDashboard;