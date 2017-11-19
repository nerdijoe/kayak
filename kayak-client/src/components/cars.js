/**
 * Created by ManaliJain on 11/17/17.
 */
import React,{Component} from 'react';

class Cars extends Component{
    render(){
        return(
            <div>
                <div className="tab-pane">
                        <div className="row cars">
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group form-group-lg form-group-icon-left">
                                            <label>Where are you going?</label>
                                            <input className="typeahead form-control" placeholder="Where" type="text" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="input-daterange" data-date-format="M d, D">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="form-group form-group-lg form-group-icon-left">
                                                <label>Pick-up Date</label>
                                                <input className="form-control" name="start" type="date" />
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="form-group form-group-lg form-group-icon-left">
                                                <label>Drop-off Date</label>
                                                <input className="form-control" name="end" type="date" />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="hotel-search-button">
                                                <button id="pQ6O-submit" className="Common-Widgets-Button-ButtonDeprecated Common-Widgets-Button-Button Button-Gradient size-l searchButton"
                                                        type="submit" aria-label="Search">
                                                    <span className="v-c-p centre">
                                                    <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"><path d="M31.88 12.32l-1.43 1.4L39.56 23H20v2h19.56l-9.11 9.27 1.43 1.41L43.35 24 31.88 12.32M11 23h6v2h-6zM5 23h3v2H5z"></path></svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}
export default Cars;