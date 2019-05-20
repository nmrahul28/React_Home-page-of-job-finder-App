import React from 'react';
import HeaderComponent from './Header_Component';
import Footer from './Footer.js';
import './App.css';
import './Cards.css';
import { Card } from './redux/containers/apply_container.js';
import Filter from './Filters';
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      new_data: [],
      all_data: []
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps :: ", nextProps);
    this.setState({
      new_data: nextProps.jobs,
      all_data: nextProps.jobs
    })
  }
  componentWillMount() {
    if (localStorage.getItem('Currentrole') === '2' || localStorage.getItem('Currentrole') === null) {
      this.props.getjob_user(1);
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
      this.props.getjob_user(1, company_name);
      this.setState({
        new_data: this.props.jobs,
        all_data: this.props.jobs
      })
    }
  }

  filtered_data = (data) => {
    this.setState({
      new_data: data
    }, () => { console.log(data) });
  }
  button_page = (e, id) => {
    var current_page = id;
    localStorage.setItem('current_page', id);
    if (localStorage.getItem('Currentuser')) {
      var company_name = localStorage.getItem('Currentuser');
      company_name = company_name.replace(/"/g, "");
    }
    if (localStorage.getItem('Currentrole') === '2') {
      this.props.getjob_user(current_page);
    }
    else {
      this.props.getjob_user(current_page, company_name);
    }
    this.setState({
      new_data: this.props.jobs,
      all_data: this.props.jobs
    })
  }
  render() {
    var total_pages = JSON.parse(localStorage.getItem('total_page'));
    var total_array = [];
    for (let i = 1; i <= total_pages; i++) {
      total_array[i] = i;
    }
    return (
      <div>
        <HeaderComponent />
        <Filter filtered={this.filtered_data} data_filter={this.state.all_data}></Filter>
        <div className="main_div">
          <Card content={this.state.new_data}></Card>
          <div className="page_buttons">
            {total_array.map((ele, i) => {
              return <button key={i} className="button2" style={{ marginLeft: '15px' }} type="button" id={ele} onClick={(e) => this.button_page(e, ele)}>{ele}</button>
            })}
          </div>
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
export default Home;