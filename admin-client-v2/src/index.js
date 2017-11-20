import React from 'react';
import ReactDOM from 'react-dom';

import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';

import { Provider } from 'react-redux';

import App from 'containers/App/App.jsx';
import SignIn from 'views/Auth/SignIn';


import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';

import store from './store/manageStore';


ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>

      {/* <Route path="/" name="Home" component={App}/> */}
      <Route exact path="/signin" name="Sign In" component={SignIn}/>
      <Route path='/' name="Home" component={App} />
 
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'));
