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
    render() {
        const job_data = this.props.content;
        console.log(job_data)
        return job_data.map((element, index) => {
            return (<div key={index} className="row">
                <div className="column">
                    <div className="card">
                        <img src={logo} alt="image12"></img>
                        <h3>{element.job_designation}</h3>
                        <p>{element.company_name}</p>
                        <p>Rs. {element.salary} per Month</p>
                        <p>{element.location}</p>
                        {(localStorage.getItem('Currentrole') === '2' || localStorage.getItem('Currentrole') === null) && <button id={element._id}  className="button2" type="button">Apply</button>}
                        {(localStorage.getItem('Currentrole') === '3') && <button id={element._id} onClick={(e) => this.handleClick(element, e)} className="button2" type="button">Edit</button>}
                    </div>
                </div>
            </div>);
        });
    }
}
export default withRouter(Cards);