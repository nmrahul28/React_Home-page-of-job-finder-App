import  {connect} from  "react-redux";
import Jobform from '../../GeneralComponents/jobform.js';
import {addjob} from '../actions/job_action.js';

const mapDispatchToProps = (dispatch) =>{
    return {
        dispatch,
        addjob:(data)=>dispatch(addjob(data))

    }
}
export default connect(null, mapDispatchToProps)(Jobform);