import axios from 'axios';

export const getDataLogin =(data) => {
    return {
        type: "GET_LOGIN",
        payload: data
    }
}

export const postDataSignup =(data) => {
    return {
        type: "POST_SIGNUP",
        payload: data
    }
}

export const getlogin = (email, pass) => {
    return dispatch => {
        axios.post('http://localhost:8081/user/readone',{
            email:email,
            password:pass
        }).then((res) => {
            console.log(res.data);
            dispatch(getDataLogin(res.data));
        }).catch((err) => {
            return err;
        })

    }
}

export const getsignup = (data) => {

    return dispatch => {
        axios.post('http://localhost:8081/users/post',data)
        .then((res) => {
            console.log(res.data);
            dispatch(postDataSignup(res.data));
        }).catch((err) => {
            return err;
        })

    }
}