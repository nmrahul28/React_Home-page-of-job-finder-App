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
        const job_data = this.props.data_filter;
        if (this.state.location==='' && this.state.designation==='' && this.state.company==='') {
            var data=(job_data.map((element)=>{
                return element;
            }));
        }
        else {
            data=(job_data.filter((element) => {
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
                
            }));
        }
        this.props.filtered(data);
    }
    render() {
        return (
            <form className="divstyle" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Location" name="location" value={this.state.location} onChange={this.handleChange}></input>&ensp;&ensp;
                <input type="text" placeholder="Designation" name="designation" value={this.state.designation} onChange={this.handleChange}></input>&ensp;&ensp;
                <input type="text" placeholder="Company" name="company" value={this.state.company} onChange={this.handleChange}></input>&ensp;&ensp;
                <button type="submit" value="Submit">Search</button>
            </form>
        )
    }
}
export default Filter;