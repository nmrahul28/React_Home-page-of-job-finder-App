import React from 'react';
class FormErrors extends React.Component{
  render() {
    return (
      <div>
      {
        Object.keys(this.props.formErrors).map((fieldName, index)=>{
          if(this.props.formErrors[fieldName].length>0){
            return <p style={{ color: 'red' }} key={index}>{fieldName} {this.props.formErrors[fieldName]}</p>
          }
          else{
            return '';
          }
        })
      }        
      </div>
    )
  }
}
export default FormErrors;
