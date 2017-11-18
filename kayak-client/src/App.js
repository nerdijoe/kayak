import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import HomePage from './components/homePage';


class App extends Component {
  render() {
    return (
        <div>
            <BrowserRouter>
                <HomePage/>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;

