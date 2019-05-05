import  {connect} from  "react-redux";
import Signup from '../../GeneralComponents/signup.js';
import {getsignup} from '../actions/user_action.js';

const mapDispatchToProps = (dispatch) =>{
    return {
        dispatch,
        getsignup: (post_data) => dispatch(getsignup(post_data)),

    }
}
export default connect(null, mapDispatchToProps)(Signup);