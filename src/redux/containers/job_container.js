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
        getjob_user: (current_page, company) => dispatch(getjob_user(current_page, company)),
        // getjob_company:()=>dispatch(getjob_company())

    }
}
export const home= connect(mapStateToProps, mapDispatchToProps)(Home);
