import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './Header_Component';
import Footer from './Footer.js';
import jobs from './Jobs_collection';
import Cards from './Cards';
import Filter from './Filters';
class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       new_data:jobs
    }
  }
  filtered_data=(data)=>{
    this.setState({
      new_data:data
    });
  }
  
  render() {
    return (<div>
      <HeaderComponent />
      <Filter filtered={this.filtered_data} data_filter={jobs}></Filter>
      <Cards content={this.state.new_data}></Cards>
      <Footer></Footer>
    </div>
    );
  }
}

export default App;
