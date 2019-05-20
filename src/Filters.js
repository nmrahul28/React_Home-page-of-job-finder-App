import React from 'react';
import './Filter.css'
class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: '',
            designation: '',
            company: ''
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var job_data = this.props.data_filter;
        console.log(job_data);
        var data=[];
        if (this.state.location==='' && this.state.designation==='' && this.state.company==='') {
             data=job_data.map((element)=>{
                return element;
            });
            console.log(data);
        }
        else {
             data=job_data.filter((element) => {
                if(this.state.location && element.location!==this.state.location){
                    console.log(element);
                    return false;

                }
                if(this.state.designation && element.job_designation!==this.state.designation){
                    console.log(element)
                    return false;
                }
                if(this.state.company && element.company_name!==this.state.company){
                    console.log(element)
                    return false;
                }
                else{
                    return true;

                }
                
            });
        }
        console.log(data);
        this.props.filtered(data);
    }
    render() {
        return (
            <form className="divstyle" onSubmit={this.handleSubmit}>
                <input className="input_style" type="text" placeholder="Location" name="location" value={this.state.location} onChange={this.handleChange}></input>&ensp;&ensp;
                <input className="input_style" type="text" placeholder="Designation" name="designation" value={this.state.designation} onChange={this.handleChange}></input>&ensp;&ensp;
                <input className="input_style" type="text" placeholder="Company" name="company" value={this.state.company} onChange={this.handleChange}></input>&ensp;&ensp;
                <button className="button2" type="submit" value="Submit">Search</button>
            </form>
        )
    }
}
export default Filter;