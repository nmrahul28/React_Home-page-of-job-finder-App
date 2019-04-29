import React, { Component } from 'react';
import Signup from './GeneralComponents/signup.js';
import Login from './GeneralComponents/login.js';
import Home from './Home.js';
import { BrowserRouter, Route} from "react-router-dom";
class App extends Component {
  render() {
    return (<BrowserRouter>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
    </BrowserRouter>
    );
  }
}

export default App;
