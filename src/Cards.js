import React from 'react';
import './Cards.css';
import logo from './download.png';
import { withRouter } from "react-router-dom";

class Cards extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            update_data: [],
            user_name: '',
            user_id: '',
            company_name: '',
            salary: '',
            job_designation: '',
            location: '',
            job_id: ''
        }
    }
    handleClick = (ele, e) => {
        console.log(ele);
        localStorage.setItem('job_id', ele._id);
        this.props.history.push(`/update/${JSON.stringify(ele)}`);
    }

    componentWillMount() {
        if (localStorage.getItem('Currentid')) {
            let user_id = localStorage.getItem('Currentid');
            user_id = user_id.replace(/"/g, "");
            this.props.get_applyjob(user_id);
            this.props.apply.data;
        }
        this.setState({
            apply_data: this.props.apply.data
        })
    }
    apply = (ele, e) => {
        var company_name;
        if (localStorage.getItem('isloggedIn') === 'false') {
            this.props.history.push('/login');
        }
        else {
            let user_id = localStorage.getItem('Currentid');
            user_id = user_id.replace(/"/g, "");
            let user_name = localStorage.getItem('Currentuser');
            user_name = user_name.replace(/"/g, "");
            let job_id = ele._id;
            let job_designation = ele.job_designation;
            let salary = ele.salary;
            company_name = ele.company_name;
            let location = ele.location;
            this.props.apply_job({ user_id, user_name, job_id, job_designation, salary, company_name, location }, user_id);
            this.props.get_applyjob(user_id);
            console.log(this.state.apply_data);
            this.setState({
                apply_data: this.props.apply.data
            });
            console.log(this.state.apply_data);
            alert('Applied');
        }
    }

    applied = () => {
        alert('You have already applied for this job');
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            apply_data: nextProps.apply.data,
        });
        console.log('hiii', nextProps);
    }

    render() {
        console.log(this.state.apply_data)
        var job_data = this.props.content;
        console.log(job_data);
        var applied_ids = [];
        this.state.apply_data.map((ele) => {
            applied_ids.push(ele.job_id);
        });
        console.log(applied_ids);
        console.log(job_data);
        if (typeof (job_data) !== 'undefined' && job_data.length > 0) {
            return (
                job_data.map((element, index) => {
                    return (<div key={index} className="row">
                        <div className="column">
                            <div className="card">
                                <img src={logo} alt="image12"></img>
                                <h3>{element.job_designation}</h3>
                                <p>{element.company_name}</p>
                                <p>Rs. {element.salary} per Month</p>
                                <p>{element.location}</p>
                                {(localStorage.getItem('Currentrole') === '2' || localStorage.getItem('Currentrole') === null) ? (applied_ids.find((ele) => { return ele === element._id }) ? <button onClick={this.applied} className="applied_button" type="button">Applied</button> : <button id={element._id} onClick={(e) => this.apply(element, e)} className="button2" type="button">Apply</button>) : <button id={element._id} onClick={(e) => this.handleClick(element, e)} className="button2" type="button">Edit</button>}
                            </div>
                        </div>
                    </div>);
                })
            );
        }
        else {
            return (<div>
                <h2 style={{ padding: '50px', textAlign: 'center', color: 'red' }}>No Such Kind Of Job</h2>
            </div>)
        }
    }

}
export default withRouter(Cards);
