/**
 * Created by ManaliJain on 11/16/17.
 */

import React, {Component} from 'react';
// import Flight from './flights';
// import Hotel from './hotels';
// import Car from './cars';
// import Header from './header';
import Search from './search';
import { Route, withRouter } from 'react-router-dom';
class HomePage extends Component{
    render(){
        return(
            <div className="container-fluid">

                <Route exact path="/" render={ () => (
                    <header id="main-header">
                        <div className="container">
                            <div className="nav">
                                <div className = "row">
                                    <div className = "col-sm-5">
                                        <ul className="slimmenu">
                                            <li className = "logo"> </li>
                                            <li><a href="/hotels" onClick={() => {
                                                this.props.history.push("/hotels"); }} >Hotels</a>
                                            </li>

                                            <li><a href="/flights" onClick={() => {
                                                this.props.history.push("/flights"); }} >Flights</a>
                                            </li>

                                            <li><a href="/cars" onClick={() => {
                                                this.props.history.push("/cars"); }} >Cars</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className = "col-sm-3 col-sm-offset-3">
                                        <ul className="slimmenu">
                                            <li><a href="/signup" onClick={() => {
                                                this.props.history.push("/signup"); }} >SignUp</a>
                                            </li>

                                            <li className="header-align"><a href="/signin" onClick={() => {
                                                this.props.history.push("/signin"); }} >SignIn</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                )}
                />
                {/*<Route exact path="/hotels" render={() => (*/}
                    {/*<Hotel/>*/}
                {/*)}/>*/}
                {/*<Route exact path="/flights" render={() => (*/}
                    {/*<Flight/>*/}
                {/*)}/>*/}
                {/*<Route exact path="/cars" render={() => (*/}
                    {/*<Car/>*/}
                {/*)}/>*/}

                <Search/>

            </div>

        )
    }
}

export default withRouter(HomePage);