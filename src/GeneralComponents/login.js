import React from 'react';
import Input from './Input.js'
import './signup.css';
import Button from './Button.js';
import FormErrors from './formerrors.js';
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login_email: '',
            login_password: '',
            user_data: {},
            formErrors: { login_email: '', login_password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false
        }


    }
    componentDidMount() {
        localStorage.getItem('isloggedIn') === 'true' && this.props.history.push('/');
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
    componentWillReceiveProps(nextProps) {
        this.setState({
            user_data: nextProps.user
        }, () => {
            if (!Object.keys(this.state.user_data).length) {
                alert('Login fail \n 1.Make sure you credentials are correct \n 2.make sure you have an account')
            }
            else {
                alert('Login Success');
                localStorage.setItem('Currentuser', JSON.stringify(this.state.user_data.name));
                localStorage.setItem('Currentrole', JSON.stringify(this.state.user_data.role));
                localStorage.setItem('Currentid', JSON.stringify(this.state.user_data._id));
                localStorage.setItem('isloggedIn', true);
                this.props.history.push({ pathname: '/' });
            }
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { login_email, login_password } = this.state;
        this.props.getlogin(login_email, login_password);
        console.log(this.state.user_data); 
    }
    render() {
        return (
            <div className="form-style-10">
                <div className='form_style'>
                    <form onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        {/* <div>
                        <FormErrors formErrors={this.state.formErrors} />
                    </div> */}
                        <div className="section">Email & Password</div>
                        <div className="inner-wrap">
                        <label>Email</label>
                        <Input input_class={'form-control input_style'} input_type={'email'} input_name={'login_email'} input_placeholder={'Email'} input_value={this.state.login_email} input_change={this.handleChange}></Input>
                        <label>Password</label>
                        <Input input_class={'form-control input_style'} input_type={'password'} input_name={'login_password'} input_placeholder={'Password'} input_value={this.state.login_password} input_change={this.handleChange}></Input>
                        </div>
                        <br></br>
                        <Button input_className={"button2"} btn_type={'submit'} btn_name={'Submit'}></Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;