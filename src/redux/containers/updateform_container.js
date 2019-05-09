import  {connect} from  "react-redux";
import Updateform from '../../GeneralComponents/updateform.js';
import {update_form} from '../actions/job_action.js';

const mapDispatchToProps = (dispatch) =>{
    return {
        dispatch,
        update_form:(update_data, company)=>dispatch(update_form(update_data, company)),
        // getjob_user:(company)=>dispatch(getjob_user(company))
    }
}
export default connect(null, mapDispatchToProps)(Updateform);