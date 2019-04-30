import React from 'react';
import Input from './Input.js'
import './signup.css';
import Button from './Button.js';
import FormErrors from './formerrors.js';
import HeaderComponent from '../Header_Component.js';
import { Redirect } from "react-router-dom";
import axios from 'axios';
class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      role: '',
      password: '',
      email: '',
      mobile: '',
      formErrors: { name: '', email: '', password: '', mobile: '', role: '' },
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      phoneValid: false,
      roleValid: false,
      redirect: false,
      formValid: false
    }


  }
  componentDidMount(){
    localStorage.getItem('isloggedIn')==='true' && this.props.history.push('/');
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
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let nameValid = this.state.passwordValid;
    let phoneValid = this.state.phoneValid;
    let roleValid = this.state.roleValid;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/);
        fieldValidationErrors.email = emailValid ? '' : 'invalid';
        break;
      case 'password':
        passwordValid = value.length > 7 && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        fieldValidationErrors.password = passwordValid ? '' : 'is too Weak';
        break;
      case 'name':
        nameValid = value.match(/^[a-zA-Z]+$/);;
        fieldValidationErrors.name = nameValid ? '' : ' is required';
        break;
      case 'role':
        roleValid = value.match(/^[a-zA-Z]+$/);;
        fieldValidationErrors.role = roleValid ? '' : ' is required';
        break;
      case 'mobile':
        phoneValid = value.length === 10 && value.match(/^[0-9]+$/);;
        fieldValidationErrors.mobile = phoneValid ? '' : ' number is not valid.';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
      nameValid: nameValid,
      phoneValid: phoneValid
    }, this.validateForm);
  }
  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.nameValid && this.state.phoneValid });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, mobile, role } = this.state;
    axios.post('http://localhost:8081/users/post', { name, email, password, mobile, role })
      .then((res) => {
        alert('Signup Succcessful');
      }).catch((err) => {
        console.log(err);
      });
    this.setState({
      redirect: true,
      name: '',
      email: '',
      mobile: '',
      role: '',
      password: ''
    });
    return this.props.history.push('/login');
  }
  render() {
    return (
      <div className='form_style'>
        <form onSubmit={this.handleSubmit}>
          <h1>Signup Form</h1>
          <div className="default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <label>Name</label>
          <Input input_type={'text'} input_name={'name'} input_placeholder={'Name'} input_value={this.state.name} input_change={this.handleChange}></Input>
          <label>Email</label>
          <Input input_type={'email'} input_name={'email'} input_placeholder={'Email'} input_value={this.state.email} input_change={this.handleChange}></Input>
          <label>Mobile</label>
          <Input input_type={'tel'} input_name={'mobile'} input_placeholder={'Mobile'} input_value={this.state.mobile} input_change={this.handleChange}></Input>
          <label>Role</label>
          <Input input_type={'text'} input_name={'role'} input_placeholder={'Role'} input_value={this.state.role} input_change={this.handleChange}></Input>
          <label>Password</label>
          <Input input_type={'password'} input_name={'password'} input_placeholder={'Password'} input_value={this.state.password} input_change={this.handleChange}></Input><br></br>
          <Button btn_disable={!this.state.formValid} btn_type={'submit'} btn_name={'Submit'}></Button>
        </form>
      </div>

    )
  }
}

export default Signup;