import React from 'react';
import './Cards.css';
import logo from './download.png';
import { Link } from "react-router-dom";

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
    handleClick = (e) => {
        this.props.getjob_id(e.target.id);
        localStorage.setItem('operation', 'update');
    }
    handle_click = (e, ele) => {
        // if (localStorage.getItem('isloggedIn') === 'false') {
        //     alert('Login First');
        // }
        // else {
            if(localStorage.getItem('Currentuser')){
            var name = localStorage.getItem('Currentuser');
            name = name.replace(/"/g, "");
            var userid = localStorage.getItem('Currentid');
            userid = userid.replace(/"/g, "");
                let user_name= name;
                let user_id=userid;
                let job_id=e.target.id;
                // let job_designation=ele.job_designation;
                // let location=e.target.ele.location;
                // let salary=e.target.ele.salary;
                // let company_name=e.target.ele.company_name;
                console.log(user_name, user_id,job_id, job_designation)
        }
        // }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.get_job[0])
        this.setState({
            update_data: nextProps.get_job
        })
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
                        {(localStorage.getItem('Currentrole') === '2' || localStorage.getItem('Currentrole') === null) && <button id={element._id} onClick={()=>this.handle_click} className="button2" type="button">Apply</button>}
                        {(localStorage.getItem('Currentrole') === '3') && <Link to='/add_job' id={element._id} onClick={this.handleClick} className="button2" type="button">Edit</Link>}
                    </div>
                </div>
            </div>);
        });
    }
}
export default Cards;