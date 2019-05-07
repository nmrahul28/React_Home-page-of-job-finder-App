import  {connect} from  "react-redux";
import Cards from '../../Cards.js';
import {apply_job, get_applyjob} from '../actions/apply_actions.js';

const mapStateToProps = (state) =>{
    console.log(state.apply_data.data)
    return {
        apply:state.apply_data
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        dispatch,
        apply_job:(data)=>dispatch(apply_job(data)),
        get_applyjob:(userid)=>dispatch(get_applyjob(userid))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cards);