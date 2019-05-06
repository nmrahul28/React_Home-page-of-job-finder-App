import  {connect} from  "react-redux";
import Cards from '../../Cards.js';
import Jobform from '../../GeneralComponents/jobform.js';
import {getjob_id} from '../actions/job_action.js';

const mapStateToProps = (state) =>{
    console.log(state.job_data)
    return {
        get_job:state.job_data.data
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        dispatch,
        // getjob_id:(btn_id)=>dispatch(getjob_id(btn_id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cards);