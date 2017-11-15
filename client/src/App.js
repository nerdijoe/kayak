import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import HomePage from './components/homePage';
import {Provider} from 'react-redux';
/*import  {createStore} from 'redux';
import allReducers from './reducer';
const store = createStore(allReducers);*/

class App extends Component {
  render() {
    return (
        <div>{/*<Provider store = {store}>*/}
            <BrowserRouter>
                <HomePage/>
            </BrowserRouter>
        {/* </Provider>*/}
        </div>
    );
  }
}

export default App;
