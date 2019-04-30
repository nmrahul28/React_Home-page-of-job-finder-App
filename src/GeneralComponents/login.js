import React from 'react';
import Input from './Input.js'
import './signup.css';
import Button from './Button.js';
import FormErrors from './formerrors.js';
import HeaderComponent from '../Header_Component.js';
import axios from 'axios';
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login_email: '',
            login_password: '',
            formErrors: { login_email: '', login_password: '' },
            emailValid: false,
            passwordValid: false,
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
        switch (fieldName) {
            case 'login_email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'invalid';
                break;
            case 'login_password':
                passwordValid = value.length >= 8 && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
                fieldValidationErrors.password = passwordValid ? '' : 'is too weak';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { login_email, login_password } = this.state;
        axios.post('http://localhost:8081/user/readone', {
                email: login_email,
                password: login_password
            }).then((res) => {
            if(res.data===''){
                alert('Login fail')
            }
            else{
                alert('Login Success');
                localStorage.setItem('Currentuser', JSON.stringify(res.data.name));
                localStorage.setItem('Currentrole', JSON.stringify(res.data.role));
                localStorage.setItem('isloggedIn', true);
                this.props.history.push({pathname:'/',state:{
                    company_name:res.data.name

                }});
                console.log(res.data.name);
            }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    render() {
        return (
            <div className='form_style'>
                <form onSubmit={this.handleSubmit}>
                    <h1>Login Form</h1>
                    <div className="default">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                    <label>Email</label>
                    <Input input_type={'email'} input_name={'login_email'} input_placeholder={'Email'} input_value={this.state.login_email} input_change={this.handleChange}></Input>
                    <label>Password</label>
                    <Input input_type={'password'} input_name={'login_password'} input_placeholder={'Password'} input_value={this.state.login_password} input_change={this.handleChange}></Input><br></br>
                    <Button btn_type={'submit'} btn_name={'Submit'}></Button>
                </form>
            </div>
        )
    }
}

export default Login;