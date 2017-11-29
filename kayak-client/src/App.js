import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import HomePage from './components/homePage';
import BookingPage from './components/bookingPage';

class App extends Component {
  render() {
    return (
        <div>
            <BrowserRouter>
                <HomePage/>
             {/*<BookingPage/>*/}
            </BrowserRouter>
        </div>
    );
  }
}

export default App;

