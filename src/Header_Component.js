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
                    {/* <img height="66px" width="60px" alt="image12" src="data:image/png;base64,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" className="header-left"></img> */}
                    <div className="header-left">
                        <a href="/">Home</a>
                        <a href="#contact">Contact</a>
                        <a href="#about">About</a>
                    </div>
                    <div className="header-right">
                        {this.state.signin_tag && <Link to="/login">Login</Link>}
                        {this.state.signup_tag && <Link to="/signup">Signup</Link>}
                        {!this.state.signup_tag && localStorage.getItem('Currentrole') === '3' && <Link to='/add_job'>Add Job</Link>}
                        {!this.state.signup_tag && <Link to='/' onClick={this.logout}>Logout</Link>}
                    </div>
                </div>
                {!this.state.signup_tag && <h2 style={{ textAlign: 'center' }}>Welcome {data}</h2>}
            </div>
        );

    }
}


export default HeaderComponent;