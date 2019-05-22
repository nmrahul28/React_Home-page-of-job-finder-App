import React, { Component } from 'react'
import '../Cards.css';
import logo from '../../src/download.png'
import HeaderComponent from '../../src/Header_Component.js';
export class Getapplied extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 'Pending'
        }
    }

    componentWillMount() {
        if (localStorage.getItem('Currentuser')) {
            let company_name = localStorage.getItem('Currentuser');
            company_name = company_name.replace(/"/g, "");
            this.props.get_applyjob_company(company_name);
            this.props.apply.data;
        }
        this.setState({
            get_jobs: this.props.apply.data
        });
    }


    componentWillReceiveProps(nextProps) {
        console.log(this.state.get_jobs);
        console.log(nextProps.apply.data);
        console.log('hello', nextProps);
        this.setState({
            get_jobs: nextProps.apply.data,
            flag: false,
            obj_id: ''
        });
    }
    edit = (e, ele) => {
        this.setState({
            flag: true,
            obj_id: ele._id
        }, () => { console.log(this.state.obj_id) });
    }
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }
    handleSubmit = (event, ele) => {
        event.preventDefault();
        this.setState({
            flag: false
        })
        console.log(this.state.value);
        let id = ele._id;
        let company_name = ele.company_name;
        let user_name = ele.user_name;
        let user_id = ele.user_id;
        let job_id = ele.job_id;
        let job_designation = ele.job_designation;
        let salary = ele.salary;
        let location = ele.location;
        let job_status = this.state.value
        this.props.update_apply({ id, company_name, user_name, user_id, job_id, job_designation, salary, location, job_status }, ele.company_name);
        this.setState({
            get_jobs: this.props.apply.data
        });
    }
    company_chat=(e,ele)=>{
        console.log(ele);
        localStorage.setItem('get_job_id', ele.job_id);
        localStorage.setItem('get_user_id', ele.user_id);
        this.props.history.push(`chat_app/${JSON.stringify(ele)}`);
    }
    render() {
        console.log(this.state.get_jobs);
        return( 
            <div>
                <HeaderComponent />
           { this.state.get_jobs.map((element, index) => {
            return (<div key={index} className="row">
                <div className="column">
                    <div className="card">
                        <img src={logo} alt="image12"></img>
                        <h3>Name: {element.user_name}</h3>
                        <p>Designation: {element.job_designation}</p>
                        <p>Salary: Rs. {element.salary} per Month</p>
                        <p>Location: {element.location}</p>
                        {(element.job_status === 0) ? <b><p style={{'color':'blue'}}>Status: Pending</p></b> : null}
                        {(element.job_status === 1) ? <b><p style={{'color':'red'}}>Status: Rejected</p></b> : null}
                        {(element.job_status === 2) ? <b><p style={{'color':'orange'}}>Status: Shortlisted</p></b> : null}
                        {(element.job_status === 3) ? <b><p style={{'color':'green'}}>Status: Selected</p></b> : null}
                        {this.state.flag && (this.state.obj_id === element._id) ? (<form onSubmit={(event) => this.handleSubmit(event, element)}>
                            <label>
                                <select value={this.state.value} onChange={this.handleChange}>
                                    <option value="Pending">Pending</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Selected">Selected</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </label>
                            <input className="button2" type="submit" value="Submit" />
                        </form>) : null}
                        {(!this.state.flag || (this.state.obj_id !== element._id)) && <button className="button2" id={element._id} onClick={(e) => this.edit(e, element)}>Edit Status</button>}
                        <button type="submit" className="button2" onClick={(e)=>{this.company_chat(e,element)}}>Chat</button>
                    </div>
                </div>
            </div>)
        })}
        </div>)
    }
}

export default Getapplied
