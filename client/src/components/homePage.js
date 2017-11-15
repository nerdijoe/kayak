import React, {Component} from 'react';
import Flight from './flights';
import Hotel from './hotels';
import Car from './cars';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
class HomePage extends Component{
    render(){
        return(
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div>
                        <button className="btn btn-primary " style={{width:100,margin:"10%"}} onClick={() => {
                            this.props.history.push("/hotels");
                        }}>
                            Hotel
                        </button>
                        <button className="btn btn-primary " style={{width:100,margin:"10%"}} onClick={() => {
                            this.props.history.push("/flights");
                        }}>
                            Flight
                        </button>
                        <button className="btn btn-primary " style={{width:100,margin:"10%"}} onClick={() => {
                            this.props.history.push("/cars");
                        }}>
                            Car
                        </button>
                    </div>
                )}/>

                <Route exact path="/hotels" render={() => (
                        <Hotel/>
                )}/>
                <Route exact path="/flights" render={() => (
                    <Flight/>
                )}/>
                <Route exact path="/cars" render={() => (
                    <Car/>
                )}/>
            </div>
        )
    }
}


export default withRouter(HomePage);