import React, { Component } from 'react'
import Input from './Input.js';
import Button from './Button';
import FormErrors from './formerrors';
import './jobform.css';
import './signup.css';
export class updateform extends Component {
    constructor(props) {
        super(props)

        this.state = {
            job_designation: '',
            job_location: '',
            salary: '',
            update: [],
            formErrors: { job_designation: '', job_location: '', salary: '' },
            companyValid: false,
            jobValid: false,
            locValid: false,
            salaryValid: false

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
        let salaryValid = this.state.salaryValid;
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
            salaryValid: salaryValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid: this.state.jobValid && this.state.salaryValid && this.state.locValid });
    }
    componentWillMount(){
        let job_object=JSON.parse(this.props.match.params.job);
        console.log(job_object)
        this.setState({
            job_designation:job_object.job_designation,
            salary:job_object.salary,
            job_location:job_object.location
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const {job_designation, job_location, salary}=this.state;
        console.log(this.state);
        if (localStorage.getItem('job_id')) {
            var id = localStorage.getItem('job_id');
            id = id.replace(/"/g, "");
        }
        var company = localStorage.getItem('Currentuser');
        company = company.replace(/"/g, "");
        this.props.update_form({id, job_designation, job_location, salary}, company);
        alert('update successful');
        this.props.history.push('/');
    }
  render() {
    return (
        <div class="form-style-10">
        <div className='form_style'>
                <form onSubmit={this.handleSubmit}>
                    <h1>Update job</h1>
                    <div className="default">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                    <label>Job Designation</label>
                    <Input input_class={'form-control input_style'} input_type={'text'} input_name={'job_designation'} input_placeholder={'Designation'} input_value={this.state.job_designation} input_change={this.handleChange}></Input>
                    <label>Salary</label>
                    <Input input_class={'form-control input_style'} input_type={'text'} input_name={'salary'} input_placeholder={'Salary'} input_value={this.state.salary} input_change={this.handleChange}></Input>
                    <label>Location</label>
                    <Input input_class={'form-control input_style'} input_type={'text'} input_name={'job_location'} input_placeholder={'Location'} input_value={this.state.job_location} input_change={this.handleChange}></Input>
                    <br></br>
                    <Button input_className={"button2"} btn_type={'submit'} btn_name={'Update'}></Button>&ensp;&ensp;
                </form>
            </div>
            </div>)
  }
}

export default updateform
