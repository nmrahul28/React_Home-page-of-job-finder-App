import axios from 'axios';

export const getDataSuccess =(data) => {
    return {
        type: "GET_DATA_FULFILLED",
        payload: data
    }
}


export const getJobSkills = () => {

    return dispatch => {
        axios.get('http://localhost:8081/jobs/read').then((res) => {
            console.log(res.data);
            dispatch(getDataSuccess(res.data))
        }).catch((err) => {
            return err;
        })

    }
}



