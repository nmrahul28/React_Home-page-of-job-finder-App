import axios from 'axios';

export const getapply =(data) => {
    return {
        type: "APPLY",
        payload: data
    }
}

export const apply_job = (data) => {

    return dispatch => {
        axios.post('http://localhost:8081/apply',data)
        .then((res) => {
            console.log(res.data);
            dispatch(getapply(res.data));
        }).catch((err) => {
            return err;
        })

    }
}

export const getapply_data =(data) => {
    return {
        type: "GET_APPLY",
        payload: data
    }
}

export const get_applyjob = (userid) => {
    var url =`http://localhost:8081/apply/find_applies/${userid}`;
    return dispatch => {
        axios.get(url)
        .then((res) => {
            console.log(res.data);
            dispatch(getapply_data(res.data));
        }).catch((err) => {
            return err;
        })

    }
}