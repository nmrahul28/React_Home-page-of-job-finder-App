import React, { Component } from 'react'
import '../Cards.css';
import logo from '../../src/download.png'
import HeaderComponent from '../../src/Header_Component.js';
import ChatApp from '../ChatApp.js';
export class Showapplied extends Component {
    componentWillMount() {
        if (localStorage.getItem('Currentid')) {
            let userid = localStorage.getItem('Currentid');
            userid = userid.replace(/"/g, "");
            this.props.get_applyjob_user(userid);
            this.props.apply.data;
        }
        this.setState({
            check_applied: this.props.apply.data,
            flag:false
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('hello', nextProps);
        this.setState({
            check_applied: nextProps.apply.data,
            flag:false
        });
    }
    chat_app=(e, ele)=>{
        console.log(ele);
        localStorage.setItem('ele_id',ele.job_id);
        this.props.history.push(`/chat_app/${JSON.stringify(ele)}`);
    }
    render() {
        console.log(this.state.check_applied);
        return (
            <div>
                <HeaderComponent />
            {!this.state.flag && this.state.check_applied.map((element, index) => {
            return (<div key={index} className="row">
                <div className="column">
                    <div className="card">
                        <img src={logo} alt="image12"></img>
                        <h3>Applied to: {element.company_name}</h3>
                        <p>Designation: {element.job_designation}</p>
                        <p>Salary: Rs. {element.salary} per Month</p>
                        <p>Location: {element.location}</p>
                        {(element.job_status === 0) ? <b><p style={{ 'color': 'blue' }}>Status: Pending</p></b> : null}
                        {(element.job_status === 1) ? <b><p style={{ 'color': 'red' }}>Status: Rejected</p></b> : null}
                        {(element.job_status === 2) ? <b><p style={{ 'color': 'orange' }}>Status: Shortlisted</p></b> : null}
                        {(element.job_status === 3) ? <b><p style={{ 'color': 'green' }}>Status: Selected</p></b> : null}
                        <button type="submit" className="button2" onClick={(e)=>this.chat_app(e,element)}>Chat</button>
                    </div>
                </div>
            </div>)
        })}
        {this.state.flag && <ChatApp data={this.state.new_obj} />}
        </div>)
    }
}

export default Showapplied
