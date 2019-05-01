import React from 'react';
class input extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }
  render() {
    return (<div className="form-group">
      <input className={ this.props.input_class} type={this.props.input_type} name={this.props.input_name} value={this.props.input_value} placeholder={this.props.input_placeholder} onChange={this.props.input_change}></input>
    </div>);
  }

}
export default input;