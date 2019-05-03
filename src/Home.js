import React from 'react';
import HeaderComponent from './Header_Component';
import Footer from './Footer.js';
import './App.css';
import Cards from './Cards';
import Filter from './Filters';
import axios from 'axios';
import { getJobSkills } from './redux/actions/action.js';
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      new_data: []
    }
  }
  componentDidMount() {
    if (localStorage.getItem('Currentrole') === '2' || localStorage.getItem('Currentrole') === null) {
      // axios.get('http://localhost:8081/jobs/read').then((res) => {
      //   this.setState({
      //     new_data: res.data,
      //     all_data: res.data
      //   })
      //   console.log(this.state.new_data);
      // }).catch((err) => {
      //   console.log(err);
      // })
      this.props.getJobSkills();
      this.setState({
        new_data: this.props.jobs,
        all_data: this.props.jobs
      })
      console.log(this.state.new_data);
    }
    else {
      if (localStorage.getItem('Currentuser')) {
        var company_name = localStorage.getItem('Currentuser');
        company_name = company_name.replace(/"/g, "");
      }
      axios.get('http://localhost:8081/jobs', {
        params: {
          company_name: company_name
        }
      }).then((res) => {
        this.setState({
          new_data: res.data,
          all_data: res.data
        })
      }).catch((err) => {
        console.log(err);
      })
    }
  }


  filtered_data = (data) => {
    this.setState({
      new_data: data
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps :: ", nextProps)
    this.setState({ new_data: nextProps.jobs,
     all_data:nextProps.jobs})
  }
  render() {
    console.log(this.state.new_data)
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