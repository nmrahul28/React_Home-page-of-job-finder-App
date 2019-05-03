import  {connect} from  "react-redux";
import Home from '../../Home.js';
import {getJobSkills} from '../actions/action.js';

const mapStateToProps = (state) =>{
    console.log(state.jobs)
    return {
        jobs:state.jobs.data
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        dispatch,
        getJobSkills: () => dispatch(getJobSkills()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);