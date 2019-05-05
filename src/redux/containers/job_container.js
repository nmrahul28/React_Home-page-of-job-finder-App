import  {connect} from  "react-redux";
import Home from '../../Home.js';
import {getjob_user, getjob_company} from '../actions/job_action.js';

const mapStateToProps = (state) =>{
    console.log(state.jobs)
    return {
        jobs:state.jobs.data
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        dispatch,
        getjob_user: (company) => dispatch(getjob_user(company)),
        // getjob_company:()=>dispatch(getjob_company())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);