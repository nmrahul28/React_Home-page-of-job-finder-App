import React, { Component } from 'react';
import Signup from './redux/containers/user_signup_container.js';
import Login from './redux/containers/user_container.js';
import {home} from './redux/containers/job_container.js';
import Jobform from './redux/containers/add_job_container.js';
import {getapplied} from './redux/containers/apply_container.js';
import {showapplied} from './redux/containers/apply_container.js';
import ChatApp from './ChatApp.js';
import Updateform from './redux/containers/updateform_container.js';
import { BrowserRouter, Route} from "react-router-dom";
class App extends Component {
  render() {
    return (<BrowserRouter>
      <Route exact path='/' component={home} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path='/add_job' component={Jobform} />
      <Route path='/update/:job' component={Updateform} />
      <Route path='/show_jobs' component={getapplied} />
      <Route path ='/show_applied' component={showapplied} />
      <Route path='/chat_app/:msg' component={ChatApp} />
    </BrowserRouter>
    );
  }
}

export default App;
