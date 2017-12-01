/**
 * Created by ManaliJain on 11/17/17.
 */
import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Flights extends Component{

    constructor(props){
        super(props);
        this.state ={
            "flightTripSelection" : 'round',
            departure:"",
            source:"",
            departureDate:"",
            arrivalDate:"",
            classType:"",
            seats:0
        }
    }

    flightTabCLick = (selection) => {
        this.setState({
            "flightTripSelection": selection
        });
    }

    isFLightTabActive = (value) =>{
        // return 'btn '+((value===this.state.selection) ?'active':'default');
        return "tab-pane fade "+((value === this.state.flightTripSelection) ?'in active':'default');
    }

    isFlightTripActive = (value) =>{
        return ((value === this.state.flightTripSelection) ?'active':'');
    }

    handleSearchFlights=() => {
    this.props.history.push('/flights/search');

    }
    render(){
        return(
           <div>
               <div className="nav">
                   <ul className="slimmenu-flight">
                       <li className={this.isFlightTripActive('round')}><a onClick={() => this.flightTabCLick('round')}>Round Trip</a>
                       </li>
                       <li className={this.isFlightTripActive('one')}><a onClick={() => this.flightTabCLick('one')}>One Way</a>
                       </li>
                   </ul>
                   <div className="tab-content">
                       <div className={this.isFLightTabActive('round')} id="flight-search-1">
                           <div className="row">
                               <div className="col-md-5">
                                   <div className="row">
                                       <div className="col-md-6">
                                           <div className="form-group form-group-lg form-group-icon-left">
                                               <label>From</label>
                                               <input className="typeahead form-control" placeholder="From where?" type="text"
                                                      value = {this.state.source}
                                                      onChange={(event) => {
                                                          this.setState({...this.state,
                                                          source: event.target.value
                                                      });
                                                          this.applyFilter();
                                                      }}
                                               />
                                           </div>
                                       </div>
                                       <div className="col-md-6">
                                           <div className="form-group form-group-lg form-group-icon-left">
                                               <label>To</label>
                                               <input className="typeahead form-control" placeholder="To where?" type="text"
                                                      value={this.state.destination}
                                                      onChange={(event)=>{
                                                          this.setState({
                                                              ...this.state,
                                                              destination:event.target.value
                                                          });
                                                      }}
                                               />
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               <div className="col-md-7">
                                   <div className="input-daterange" data-date-format="M d, D">
                                       <div className="row">
                                           <div className="col-md-4">
                                               <div className="form-group form-group-lg form-group-icon-left">
                                                   <label>Departure</label>
                                                   <input className="form-control" type ="date" name="start"
                                                        value={this.state.departureDate}
                                                          onChange={(event)=>{
                                                              this.setState({
                                                                  ...this.state,
                                                                  departureDate:event.target.value
                                                              });
                                                          }}
                                                   />
                                               </div>
                                           </div>
                                           <div className="col-md-4">
                                               <div className="form-group form-group-lg form-group-icon-left">
                                                   <label>Arrival</label>
                                                   <input className="form-control" name="end" type="date"
                                                          value={this.state.arrivalDate}
                                                          onChange={(event)=>{
                                                              this.setState({
                                                                  ...this.state,
                                                                  arrivalDate:event.target.value
                                                              });
                                                          }}
                                                   />
                                               </div>
                                           </div>
                                           <div className="col-md-2">
                                               <div className="form-group form-group-lg form-group-select-plus">
                                                   <label>Passengers</label>
                                                   <select className="form-control"
                                                           value = {this.state.seats}
                                                           onChange={(event)=>{
                                                               this.setState({
                                                                   ...this.state,
                                                                   seats:event.target.value
                                                               })
                                                           }}>
                                                       <option value ='1'>1</option>
                                                       <option value ='2'>2</option>
                                                       <option value ='3'>3</option>
                                                       <option value ='4'>4</option>
                                                       <option value ='5'>5</option>
                                                       <option value ='6'>6</option>
                                                       <option value ='7'>7</option>
                                                       <option value ='8'>8</option>
                                                       <option value ='9'>9</option>
                                                       <option value ='10'>10</option>
                                                   </select>
                                               </div>
                                           </div>
                                           <div className="col-md-2">
                                               <div className="form-group form-group-lg form-group-select-plus">
                                                   <label>Class</label>
                                                   <select className="form-control"
                                                        value = {this.state.classType}
                                                        onChange={(event)=>{
                                                            this.setState({
                                                                ...this.state,
                                                                classType:event.target.value
                                                            })
                                                        }}>
                                                       <option value="Economy">Economy</option>
                                                       <option value="Business">Business</option>
                                                       <option value="First">First</option>
                                                   </select>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className={this.isFLightTabActive('one')} id="flight-search-2">
                           <div className="row">
                               <div className="col-md-6">
                                   <div className="row">
                                       <div className="col-md-6">
                                           <div className="form-group form-group-lg form-group-icon-left">
                                               <label>From</label>
                                               <input className="typeahead form-control" placeholder="From where?" type="text"
                                                      value = {this.state.source}
                                                      onChange={(event) => {
                                                          this.setState({...this.state,
                                                              source: event.target.value
                                                          });
                                                          this.applyFilter();
                                                      }}
                                               />
                                           </div>
                                       </div>
                                       <div className="col-md-6">
                                           <div className="form-group form-group-lg form-group-icon-left">
                                               <label>To</label>
                                               <input className="typeahead form-control" placeholder="To where?" type="text"
                                                      value = {this.state.destination}
                                                      onChange={(event) => {
                                                          this.setState({...this.state,
                                                              destination: event.target.value
                                                          });
                                                          this.applyFilter();
                                                      }}
                                               />
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               <div className="col-md-6">
                                   <div className="input-daterange" data-date-format="M d, D">
                                       <div className="row">
                                           <div className="col-md-5">
                                               <div className="form-group form-group-lg form-group-icon-left">
                                                   <label>Departing</label>
                                                   <input className="form-control" type ="date" name="start"
                                                          value = {this.state.departureDate}
                                                          onChange={(event) => {
                                                              this.setState({...this.state,
                                                                  departureDate: event.target.value
                                                              });
                                                              this.applyFilter();
                                                          }}/>
                                               </div>
                                           </div>
                                           <div className="col-md-3">
                                               <div className="form-group form-group-lg form-group-select-plus">
                                                   <label>Passengers</label>
                                                   <select className="form-control " value = {this.state.seats}
                                                           onChange={(event)=>{
                                                               this.setState({
                                                                   ...this.state,
                                                                   seats:event.target.value
                                                               })
                                                           }}>
                                                       <option value ='1'>1</option>
                                                       <option value ='2'>2</option>
                                                       <option value ='3'>3</option>
                                                       <option value ='4'>4</option>
                                                       <option value ='5'>5</option>
                                                       <option value ='6'>6</option>
                                                       <option value ='7'>7</option>
                                                       <option value ='8'>8</option>
                                                       <option value ='9'>9</option>
                                                       <option value ='10'>10</option>
                                                   </select>
                                               </div>
                                           </div>
                                           <div className="col-md-3">
                                               <div className="form-group form-group-lg form-group-select-plus">
                                                   <label>Class</label>
                                                   <select className="form-control" value = {this.state.classType}
                                                           onChange={(event)=>{
                                                               this.setState({
                                                                   ...this.state,
                                                                   classType:event.target.value
                                                               })
                                                           }}>
                                                       <option value="Economy">Economy</option>
                                                       <option value="Business">Business</option>
                                                       <option value="First">First</option>
                                                   </select>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
               <button className="btn-lg btn-search" type="submit" onClick = {()=> this.handleSearchFlights()}>Search for Flights --> </button>
           </div>
        )
    }
}
// export default Flights;
/*function matchDispatchToProps(dispatch){
    return bindActionCreators({
        filterData:filterData
    },dispatch);
}*/

function mapStateToProps(state) {
    console.log("state App", state);
    return{
        flightData : state.flightData,
        filteredData : state.filteredData
    };
}

const FlightsSearch = withRouter(connect(mapStateToProps)(Flights));
export default FlightsSearch;