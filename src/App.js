import React, { Component } from 'react';
import Signup from './redux/containers/user_signup_container.js';
import Login from './redux/containers/user_container.js';
import Home from './redux/containers/job_container.js';
import Jobform from './redux/containers/add_job_container.js';
import Cards from './redux/containers/update_job_container.js';
import { BrowserRouter, Route} from "react-router-dom";
class App extends Component {
  render() {
    return (<BrowserRouter>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path='/add_job' component={Jobform} />
    </BrowserRouter>
    );
  }
}

export default App;
