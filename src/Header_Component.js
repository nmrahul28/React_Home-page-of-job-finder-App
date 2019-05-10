import React from 'react';
import '../src/Header.css';
import { Link } from "react-router-dom";
class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isloggedIn: localStorage.getItem('isloggedIn'),
            signin_tag: true,
            signup_tag: true
        }
    }
    componentDidMount() {
        if (this.state.isloggedIn === 'true') {
            this.setState({
                signin_tag: false,
                signup_tag: false
            });
        }
    }


    logout = () => {
        localStorage.setItem('isloggedIn', false);
        this.setState({
            isloggedIn: false,
            signin_tag: true,
            signup_tag: true
        });
        localStorage.removeItem('Currentuser');
        localStorage.removeItem('Currentrole');
        localStorage.removeItem('Currentid');
        localStorage.removeItem('job_id');
        this.props.history.push({
            state: {
                falg: false
            }
        })

    }
    render() {
        if (!this.state.signup_tag) {
            var data = localStorage.getItem('Currentuser')
            data = data.replace(/"/g, "");
        }
        return (
            <div>
                <div className="header">
                    <div className="header-left">
                        <a href="/">Home</a>
                        <a href="#contact">Contact</a>
                        <a href="#about">About</a>
                    </div>
                    <div className="header-right">
                        {this.state.signin_tag && <Link to="/login">Login</Link>}
                        {this.state.signup_tag && <Link to="/signup">Signup</Link>}
                        {!this.state.signup_tag && localStorage.getItem('Currentrole') === '3' && <Link to='/show_jobs'>Get Applied</Link>}
                        {!this.state.signup_tag && localStorage.getItem('Currentrole') === '3' && <Link to='/add_job'>Add Job</Link>}
                        {!this.state.signup_tag && localStorage.getItem('Currentrole') === '2' && <Link to='/show_applied'>Check Applied</Link>}
                        {!this.state.signup_tag && <Link to='/' onClick={this.logout}>Logout</Link>}
                    </div>
                </div>
                {!this.state.signup_tag && <h2 style={{ textAlign: 'center' }}>Welcome {data}</h2>}
            </div>
        );

    }
}


export default HeaderComponent;