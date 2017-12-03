import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import {style} from "variables/Variables.jsx";

import appRoutes from 'routes/app.jsx';

import {
  axiosFetchCar,
  axiosFetchCarDealer,
  axiosFetchCarBillingAll,
  axiosFetchCarBillingCount,
  axiosFetchCarBillingTotal,

  axiosFetchHotelBillingAll,
  axiosFetchHotelBillingCustom,
  axiosFetchHotelBillingName,
  axiosFetchHotelBillingCity,
  axiosFetchHotelBillingCumulative,

  axiosFetchFlightBillingAll,
  axiosFetchFlightBillingCumulative,
  axiosFetchFlightBillingName,
  axiosFetchFlightBillingDepAirport,
  axiosFetchFlightBillingDepCity,
  axiosFetchFlightBillingArrAirport,
  axiosFetchFlightBillingArrCity,
  axiosFetchFlightBillingClass,
  axiosFetchFlightBillingCustom,

  axiosFetchUser,

  axiosFetchFlight,
  axiosFetchAirport,
  axiosFetchAirline,

  axiosFetchHotel,

  axiosFetchLogPages,
  axiosFetchLogPagesCount,

  axiosFetchLogSearches,
  axiosFetchLogSearchesType,
  axiosFetchLogSearchesDealerCity,

} from '../../actions';


class App extends Component {
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleNotificationClick = this.handleNotificationClick.bind(this);
        this.state = {
            _notificationSystem: null
        };
    }
    handleNotificationClick(position){
        var color = Math.floor((Math.random() * 4) + 1);
        var level;
        switch (color) {
            case 1:
                level = 'success';
                break;
            case 2:
                level = 'warning';
                break;
            case 3:
                level = 'error';
                break;
            case 4:
                level = 'info';
                break;
            default:
                break;
        }
        this.state._notificationSystem.addNotification({
            title: (<span data-notify="icon" className="pe-7s-gift"></span>),
            message: (
                <div>
                    Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.
                </div>
            ),
            level: level,
            position: position,
            autoDismiss: 15,
        });
    }

    componentDidMount(){
      this.props.axiosFetchCar();
      this.props.axiosFetchCarDealer();
      this.props.axiosFetchCarBillingAll();
      this.props.axiosFetchCarBillingCount();
      this.props.axiosFetchCarBillingTotal();

      this.props.axiosFetchHotelBillingAll();
      this.props.axiosFetchHotelBillingCustom();
      this.props.axiosFetchHotelBillingName();
      this.props.axiosFetchHotelBillingCity();
      this.props.axiosFetchHotelBillingCumulative();
      
      this.props.axiosFetchFlightBillingAll();
      this.props.axiosFetchFlightBillingCumulative();
      this.props.axiosFetchFlightBillingName();
      this.props.axiosFetchFlightBillingDepAirport();
      this.props.axiosFetchFlightBillingDepCity();
      this.props.axiosFetchFlightBillingArrAirport();
      this.props.axiosFetchFlightBillingArrCity();
      this.props.axiosFetchFlightBillingClass();
      this.props.axiosFetchFlightBillingCustom();
      
      this.props.axiosFetchAirport();
      this.props.axiosFetchAirline();
      this.props.axiosFetchUser();

      this.props.axiosFetchFlight();

      this.props.axiosFetchHotel();

      this.props.axiosFetchLogPages();
      this.props.axiosFetchLogPagesCount();


      this.props.axiosFetchLogSearches();
      this.props.axiosFetchLogSearchesType();
      this.props.axiosFetchLogSearchesDealerCity();

      
      if(localStorage.getItem('admin_token') == null) {
        this.props.history.push('/signin');
      }

        this.setState({_notificationSystem: this.refs.notificationSystem});
        var _notificationSystem = this.refs.notificationSystem;
        var color = Math.floor((Math.random() * 4) + 1);
        var level;
        switch (color) {
            case 1:
                level = 'success';
                break;
            case 2:
                level = 'warning';
                break;
            case 3:
                level = 'error';
                break;
            case 4:
                level = 'info';
                break;
            default:
                break;
        }
        _notificationSystem.addNotification({
            title: (<span data-notify="icon" className="pe-7s-gift"></span>),
            message: (
                <div>
                    Welcome to <b>Kayak Dashboard</b>!
                </div>
            ),
            level: level,
            position: "tr",
            autoDismiss: 15,
        });
    }
    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }
    render() {
        return (

                <div className="wrapper">
                    <NotificationSystem ref="notificationSystem" style={style}/>
                    <Sidebar {...this.props} />
                    <div id="main-panel" className="main-panel">
                        <Header {...this.props}/>
                            <Switch>
                                {
                                    appRoutes.map((prop,key) => {
                                        if(prop.name === "Notifications")
                                            return (
                                                <Route
                                                    path={prop.path}
                                                    key={key}
                                                    render={routeProps =>
                                                       <prop.component
                                                           {...routeProps}
                                                           handleClick={this.handleNotificationClick}
                                                       />}
                                                />
                                            );
                                        if(prop.redirect)
                                            return (
                                                <Redirect from={prop.path} to={prop.to} key={key}/>
                                            );
                                        if(prop.name === "User Listing")
                                            return(
                                                <Route exact path={prop.path} component={prop.component} key={key}/>
                                            );
                                        return (
                                            <Route path={prop.path} component={prop.component} key={key}/>
                                        );
                                    })
                                }
                            </Switch>
                        <Footer />
                    </div>
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    axiosFetchCar: () => { dispatch(axiosFetchCar()); },
    axiosFetchCarDealer: () => { dispatch(axiosFetchCarDealer()); },
    axiosFetchCarBillingAll: () => { dispatch(axiosFetchCarBillingAll());},
    axiosFetchCarBillingCount: () => { dispatch(axiosFetchCarBillingCount());},
    axiosFetchCarBillingTotal: () => { dispatch(axiosFetchCarBillingTotal());},

    axiosFetchUser: () => { dispatch(axiosFetchUser()); },

    axiosFetchFlight: () => { dispatch(axiosFetchFlight()); },
    axiosFetchAirport: () => { dispatch(axiosFetchAirport()); },
    axiosFetchAirline: () => { dispatch(axiosFetchAirline()); },
    axiosFetchHotel: () => { dispatch(axiosFetchHotel()); },

    axiosFetchHotelBillingAll: () => { dispatch(axiosFetchHotelBillingAll()); },
    axiosFetchHotelBillingCustom: () => { dispatch(axiosFetchHotelBillingCustom()); },
    axiosFetchHotelBillingName: () => { dispatch(axiosFetchHotelBillingName()); },
    axiosFetchHotelBillingCity: () => { dispatch(axiosFetchHotelBillingCity()); },
    axiosFetchHotelBillingCumulative: () => { dispatch(axiosFetchHotelBillingCumulative()); },

    axiosFetchFlightBillingAll: () => { dispatch(axiosFetchFlightBillingAll()); },
    axiosFetchFlightBillingCumulative: () => { dispatch(axiosFetchFlightBillingCumulative()); },
    axiosFetchFlightBillingName: () => { dispatch(axiosFetchFlightBillingName()); },
    axiosFetchFlightBillingDepAirport: () => { dispatch(axiosFetchFlightBillingDepAirport()); },
    axiosFetchFlightBillingDepCity: () => { dispatch(axiosFetchFlightBillingDepCity()); },
    axiosFetchFlightBillingArrAirport: () => { dispatch(axiosFetchFlightBillingArrAirport()); },
    axiosFetchFlightBillingArrCity: () => { dispatch(axiosFetchFlightBillingArrCity()); },
    axiosFetchFlightBillingClass: () => { dispatch(axiosFetchFlightBillingClass()); },
    axiosFetchFlightBillingCustom: () => { dispatch(axiosFetchFlightBillingCustom()); },
    

    axiosFetchLogPages: () => { dispatch(axiosFetchLogPages()); },
    axiosFetchLogPagesCount: () => { dispatch(axiosFetchLogPagesCount()); },
    axiosFetchLogSearches: () => { dispatch(axiosFetchLogSearches()); },
    axiosFetchLogSearchesType: () => { dispatch(axiosFetchLogSearchesType()); },
    axiosFetchLogSearchesDealerCity: () => { dispatch(axiosFetchLogSearchesDealerCity()); },
    
};

};

const connectedApp = connect(null, mapDispatchToProps)(App);

export default connectedApp;
