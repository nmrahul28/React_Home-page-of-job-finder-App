import React, { Component } from 'react';
import './App.css';
import Header_Component from './Header_Component';
import Footer from './Footer.js';
import jobs from './Jobs_collection';
import Cards from './Cards';
import Filter from './Filters';
class App extends Component {
  render() {
    return (<div>
      <Header_Component />
      <Filter />
      <Cards content={jobs}></Cards>
      <Footer></Footer>
    </div>
    );
  }
}

export default App;
