import React from 'react';
import HeaderComponent from './Header_Component';
import Footer from './Footer.js';
import './App.css';
import {Card} from './redux/containers/apply_container.js';
import Filter from './Filters';
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      new_data: []
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps :: ", nextProps)
    this.setState({
      new_data: nextProps.jobs,
      all_data: nextProps.jobs
    })
  }
  componentWillMount() {
    if (localStorage.getItem('Currentrole') === '2' || localStorage.getItem('Currentrole') === null) {
      this.props.getjob_user();
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
      this.props.getjob_user(company_name);
      this.setState({
        new_data: this.props.jobs,
        all_data: this.props.jobs
      })
    }

  }

  filtered_data = (data) => {
    this.setState({
      new_data: data
    });
  }
  render() {
    console.log(this.state.new_data)
    return (
      <div>
        <HeaderComponent />
        <Filter filtered={this.filtered_data} data_filter={this.state.all_data}></Filter>
        <Card content={this.state.new_data}></Card>
        <Footer></Footer>
      </div>
    )
  }
}
export default Home;