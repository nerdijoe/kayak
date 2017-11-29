import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import HomePage from './components/homePage';
import CarSearch from './components/car-search';


class App extends Component {
  render() {
    return (
        <div>
            <BrowserRouter>
                <HomePage/>
                {/*<CarSearch/>*/}
            </BrowserRouter>
        </div>
    );
  }
}

export default App;

