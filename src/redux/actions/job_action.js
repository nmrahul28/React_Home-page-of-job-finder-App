import axios from 'axios';

export const getDataSuccess = (data) => {
    return {
        type: "GET_DATA_FULFILLED",
        payload: data
    }
}


export const addjobdata = (data) => {
    return {
        type: "ADD_JOB",
        payload: data
    }
}

export const get_details = (data) => {
    return {
        type: "UPDATE",
        payload: data
    }
}

export const getjob_user = (company) => {
    var url;
    if (company) {
        url = 'http://localhost:8081/jobs'
        return dispatch => {
            axios.get(url, { params: { company_name: company } }).then((res) => {
                console.log(res.data);
                dispatch(getDataSuccess(res.data));
            }).catch((err) => {
                return err;
            })

        }
    }
    else {
        url = 'http://localhost:8081/jobs/read'
        return dispatch => {
            axios.get(url).then((res) => {
                console.log(res.data);
                dispatch(getDataSuccess(res.data));
            }).catch((err) => {
                return err;
            })

        }
    }


}


export const addjob = (data) => {
    return dispatch => {
        axios.post('http://localhost:8081/jobs/post', data)
            .then((res) => {
                if (res.data.errors) {
                    window.alert(JSON.parse(res.data.message));
                }
                else {
                    let pr = new Promise((resolve, reject) => {
                        dispatch(addjobdata(res.data));
                        resolve();
                    })
                    pr.then(() => {
                        dispatch(getjob_user(data.company_name));
                    })
                }
            }).catch((err) => {
                return err;
            })

    }
}

export const update_form = (data, company_name) => {
    return dispatch => {
        axios.put('http://localhost:8081/jobs/put', data)
            .then((res) => {
                if (res.data.errors) {
                    window.alert(JSON.parse(res.data.message));
                }
                else {
                    let pr = new Promise((resolve, reject) => {
                        dispatch(get_details(res.data));
                        resolve();
                    })
                    pr.then(() => {
                        dispatch(getjob_user(company_name));
                    })
                }
            }).catch((err) => {
                return err;
            })
    }
}



