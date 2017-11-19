/**
 * Created by ManaliJain on 11/16/17.
 */

import React, {Component} from 'react';
// import Flight from './flights';
// import Hotel from './hotels';
// import Car from './cars';
// import Header from './header';
import Search from './search';
import {Route, withRouter} from 'react-router-dom';

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activePage: ""
        };
    }

    issActive = (value) => {
        return ((value === this.state.activePage) ? 'active' : '');
    }
    setActive = (value) => {
        this.setState({
            ...this.state,
            activePage: value
        });
    }

    render() {

        return (
            <div className="container-fluid">
                <header id="main-header">
                    <div className="container">
                        <div className="nav">
                            <div className="row">
                                <div className="col-sm-5">
                                    <ul className="slimmenu">
                                        <li className="logo"></li>
                                        <li><a href="/hotels" onClick={() => {
                                            // this.setActive('hotels');
                                            this.props.history.push("/hotels");
                                        }}>Hotels</a>
                                        </li>

                                        <li><a href="/flights" onClick={() => {
                                            // this.setActive('flights');
                                            this.props.history.push("/flights");
                                        }}>Flights</a>
                                        </li>

                                        <li><a href="/cars" onClick={() => {
                                            // this.setActive('cars');
                                            this.props.history.push("/cars");
                                        }}>Cars</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-sm-3 col-sm-offset-3">
                                    <ul className="slimmenu">
                                        <li><a href="/signup" onClick={() => {
                                            this.props.history.push("/signup");
                                        }}>SignUp</a>
                                        </li>

                                        <li className="header-align"><a href="/signin" onClick={() => {
                                            this.props.history.push("/signin");
                                        }}>SignIn</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <Route exact path="/" component={() => (
                    <div>

                        <Search selection="hotels"/>
                    </div>
                )}/>
                <Route exact path="/hotels" render={() => (
                    <div>
                        <Search selection="hotels"/>
                    </div>
                )}/>
                <Route exact path="/flights" render={() => (
                    <div>
                        <Search selection="flights"/>
                    </div>
                )}/>
                <Route exact path="/cars" render={() => (
                    <div>
                        <Search selection="cars"/>
                    </div>
                )}/>
            </div>
        )
    }
}

export default withRouter(HomePage);