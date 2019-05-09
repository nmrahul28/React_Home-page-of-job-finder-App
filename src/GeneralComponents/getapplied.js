import React, { Component } from 'react'
import '../Cards.css';
import logo from '../../src/download.png'
export class Getapplied extends React.Component {
    componentWillMount() {
        if (localStorage.getItem('Currentuser')) {
            let company_name = localStorage.getItem('Currentuser');
            company_name = company_name.replace(/"/g, "");
            this.props.get_applyjob_company(company_name);
            this.props.apply.data;
        }
        this.setState({
            get_jobs:this.props.apply.data
        });
    }
    componentWillReceiveProps(nextProps){
        console.log('hello', nextProps);
        this.setState({
            get_jobs:nextProps.apply.data
        });
    }
        render() {
            console.log(this.state.get_jobs);
            return this.state.get_jobs.map((element, index)=>{
                return(<div key={index} className="row">
                <div className="column">
                    <div className="card">
                        <img src={logo} alt="image12"></img>
                        <h3>Name: {element.user_name}</h3>
                        <p>Designation: {element.job_designation}</p>
                        <p>Salary: Rs. {element.salary} per Month</p>
                        <p>Location: {element.location}</p>
                        {(element.job_status === 0) ? <p>Status: Pending</p> :null}
                    </div>
                </div>
            </div>)
            })
        }
    }

    export default Getapplied
