import React from 'react';
import './Cards.css';
import logo from './download.png';
class Cards extends React.Component {
    render() {
        const job_data = this.props.content;
        return job_data.map((element, index) => {
            return (<div key={index} className="row">
                <div className="column">
                    <div className="card">
                        <img src={logo} alt="image12"></img>
                        <h3>{element.job_designation}</h3>
                        <p>{element.company_name}</p>
                        <p>Rs. {element.salary} per Month</p>
                        <p>{element.location}</p>
                        {localStorage.getItem('Currentrole')=='2' || localStorage.getItem('Currentrole')===null && <button type="button" className="learn_btn">Apply</button>}
                    </div>
                </div>
            </div>);
        });
    }
}
export default Cards;