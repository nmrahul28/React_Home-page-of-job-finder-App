import  {connect} from  "react-redux";
import Cards from '../../Cards.js';
import Getapplied from '../../GeneralComponents/getapplied.js';
import {apply_job, get_applyjob, get_applyjob_company} from '../actions/apply_actions.js';

const mapStateToProps = (state) =>{
    console.log(state.apply_data.data)
    return {
        apply:state.apply_data,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        dispatch,
        apply_job:(data)=>dispatch(apply_job(data)),
        get_applyjob:(userid)=>dispatch(get_applyjob(userid)),
        get_applyjob_company:(company)=>dispatch(get_applyjob_company(company))

    }
}
export const Card= connect(mapStateToProps, mapDispatchToProps)(Cards);
export const getapplied=connect(mapStateToProps, mapDispatchToProps)(Getapplied);
