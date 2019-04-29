import React from 'react';
class Button extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <button disabled={this.props.btn_disable} type={this.props.btn_type}>{this.props.btn_name}</button>
        );
    }
}
export default Button;