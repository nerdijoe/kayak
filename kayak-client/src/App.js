import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import HomePage from './components/homePage';
import HotelSearch from './components/hotel-search';


class App extends Component {
  render() {
    return (
        <div>
            <BrowserRouter>
                <HomePage/>
                {/*<HotelSearch/>*/}
            </BrowserRouter>
        </div>
    );
  }
}

export default App;

