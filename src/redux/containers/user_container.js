import  {connect} from  "react-redux";
import Login from '../../GeneralComponents/login.js';
import {getlogin} from '../actions/user_action.js';

const mapStateToProps = (state) =>{
    console.log(state.user)
    return {
        user:state.user.data
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        dispatch,
        getlogin: (email, pass) => dispatch(getlogin(email,pass)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);