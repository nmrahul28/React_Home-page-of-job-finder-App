import React from 'react';
import HeaderComponent from './Header_Component';
import Footer from './Footer.js';
import './App.css';
import Cards from './Cards';
import Filter from './Filters';
import axios from 'axios';
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      new_data: []
    }
  }
  componentDidMount() {
    if (localStorage.getItem('Currentrole') === '2' || localStorage.getItem('Currentrole') === null) {
      axios.get('http://localhost:8081/jobs/read').then((res) => {
        this.setState({
          new_data: res.data,
          all_data: res.data
        });
        console.log(this.state.new_data);
      }).catch((err) => {
        console.log(err);
      })
    }
    else {
      axios.get('http://localhost:8081/jobs', {
        params: {
          company_name:this.props.history.location.state.company_name
        }
      }).then((res) => {
        this.setState({
          new_data: res.data,
          all_data: res.data
        })
      }).catch((err)=>{
        console.log(err);
      })
    }
  }

  filtered_data = (data) => {
    this.setState({
      new_data: data
    });
  }
  render() {
    return (
      <div>
        <HeaderComponent />
        <Filter filtered={this.filtered_data} data_filter={this.state.all_data}></Filter>
        <Cards content={this.state.new_data}></Cards>
        <Footer></Footer>
      </div>
    )
  }
}
export default Home;