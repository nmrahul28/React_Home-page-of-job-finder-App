import React from 'react';
import './Cards.css'
class Cards extends React.Component {
    render() {
        const job_data = this.props.content;
        return job_data.map((element) => {
            return (<div className="row">
                <div className="column">
                    <div className="card">
                        <img src={element.image}></img>
                        <h3>{element.job_designation}</h3>
                        <b><p>[ job_id= {element.job_id}]</p></b>
                        <p>{element.company_name}</p>
                        <p>{element.salary}</p>
                        <button type="button" className="learn_btn">Apply</button>
                    </div>
                </div>
            </div>);
        });
    }
}
export default Cards;