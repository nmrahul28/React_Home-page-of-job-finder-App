import React from 'react';
import Input from './Input';
import Button from './Button';
import FormErrors from './formerrors';
import './jobform.css';
import axios from 'axios';
class Jobform extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            job_designation: '',
            job_location: '',
            salary: '',
            formErrors: { job_designation: '', job_location: '', salary: '' },
            companyValid: false,
            jobValid: false,
            locValid: false,
            salaryValid:false

        }
    }
    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [event.target.name]: event.target.value
        }, () => { this.validation_checker(name, value) });
    }
    validation_checker(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let jobValid = this.state.jobValid;
        let locValid = this.state.locValid;
        let salaryValid=this.state.salaryValid;
        switch (fieldName) {
            case 'job_designation':
                jobValid = value.match(/^[a-zA-Z ]*$/);;
                fieldValidationErrors.job_designation = jobValid ? '' : ' is required';
                break;
            case 'job_location':
                locValid = value.match(/^[a-zA-Z ]*$/);;
                fieldValidationErrors.job_location = locValid ? '' : ' is required';
                break;
            case 'salary':
                salaryValid = value.match(/^[0-9]*$/);
                fieldValidationErrors.salary = salaryValid ? '' : ' is required';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            jobValid: jobValid,
            locValid: locValid,
            salaryValid:salaryValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid:this.state.jobValid && this.state.salaryValid && this.state.locValid });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { job_designation, salary, job_location } = this.state;
        if(localStorage.getItem('Currentuser')){
            var company_name=localStorage.getItem('Currentuser');
            company_name = company_name.replace(/"/g,"");
        }

        axios.post('http://localhost:8081/jobs/post', { job_designation, company_name, salary, job_location })
            .then((res) => {
                console.log(res.data);
                alert('Job Added');
                this.setState({
                    job_location: '',
                    salary: '',
                    job_designation: ''
                });
                this.props.history.push({
                    pathname: '/', state: {
                        company_name: company_name
                    }
                });
            }).catch((err) => {
                console.log(err);
            })
    }
    render() {
        return (
            <div className='form_style'>
                <form onSubmit={this.handleSubmit}>
                    <h1>Add a job</h1>
                    <div className="default">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                    <label>Job Designation</label>
                    <Input input_type={'text'} input_name={'job_designation'} input_placeholder={'Designation'} input_value={this.state.job_designation} input_change={this.handleChange}></Input>
                    <label>Salary</label>
                    <Input input_type={'text'} input_name={'salary'} input_placeholder={'Salary'} input_value={this.state.salary} input_change={this.handleChange}></Input>
                    <label>Location</label>
                    <Input input_type={'text'} input_name={'job_location'} input_placeholder={'Location'} input_value={this.state.job_location} input_change={this.handleChange}></Input>
                    <br></br>
                    <Button btn_type={'submit'} btn_name={'Submit'}></Button>
                </form>
            </div>
        )
    }

}
export default Jobform;