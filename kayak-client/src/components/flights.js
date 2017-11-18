/**
 * Created by ManaliJain on 11/17/17.
 */
import React,{Component} from 'react';

class Flights extends Component{

    constructor(props){
        super(props);
        this.state ={
            "flightTripSelection" : 'round'
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
                                               <input className="typeahead form-control" placeholder="From where?" type="text" />
                                           </div>
                                       </div>
                                       <div className="col-md-6">
                                           <div className="form-group form-group-lg form-group-icon-left">
                                               <label>To</label>
                                               <input className="typeahead form-control" placeholder="To where?" type="text" />
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               <div className="col-md-7">
                                   <div className="input-daterange" data-date-format="M d, D">
                                       <div className="row">
                                           <div className="col-md-4">
                                               <div className="form-group form-group-lg form-group-icon-left">
                                                   <label>Departing</label>
                                                   <input className="form-control" type ="date" name="start"/>
                                               </div>
                                           </div>
                                           <div className="col-md-4">
                                               <div className="form-group form-group-lg form-group-icon-left">
                                                   <label>Arriving</label>
                                                   <input className="form-control" name="end" type="date" />
                                               </div>
                                           </div>
                                           <div className="col-md-2">
                                               <div className="form-group form-group-lg form-group-select-plus">
                                                   <label>Passengers</label>
                                                   <select className="form-control">
                                                       <option>1</option>
                                                       <option>2</option>
                                                       <option>3</option>
                                                       <option>4</option>
                                                       <option>5</option>
                                                       <option>6</option>
                                                       <option>7</option>
                                                       <option>8</option>
                                                       <option>9</option>
                                                       <option>10</option>
                                                   </select>
                                               </div>
                                           </div>
                                           <div className="col-md-2">
                                               <div className="form-group form-group-lg form-group-select-plus">
                                                   <label>Class</label>
                                                   <select className="form-control">
                                                       <option>Economy</option>
                                                       <option>Business</option>
                                                       <option>First</option>
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
                                               <input className="typeahead form-control" placeholder="From where?" type="text" />
                                           </div>
                                       </div>
                                       <div className="col-md-6">
                                           <div className="form-group form-group-lg form-group-icon-left">
                                               <label>To</label>
                                               <input className="typeahead form-control" placeholder="To where?" type="text" />
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
                                                   <input className="form-control" type ="date" name="start"/>
                                               </div>
                                           </div>
                                           <div className="col-md-3">
                                               <div className="form-group form-group-lg form-group-select-plus">
                                                   <label>Passengers</label>
                                                   <select className="form-control ">
                                                       <option>1</option>
                                                       <option>2</option>
                                                       <option>3</option>
                                                       <option>4</option>
                                                       <option>5</option>
                                                       <option>6</option>
                                                       <option>7</option>
                                                       <option>8</option>
                                                       <option>9</option>
                                                       <option>10</option>
                                                   </select>
                                               </div>
                                           </div>
                                           <div className="col-md-3">
                                               <div className="form-group form-group-lg form-group-select-plus">
                                                   <label>Class</label>
                                                   <select className="form-control">
                                                       <option>Economy</option>
                                                       <option>Business</option>
                                                       <option>First</option>
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
               <button className="btn-lg btn-search" type="submit">Search for Flights</button>
           </div>
        )
    }
}
export default Flights;