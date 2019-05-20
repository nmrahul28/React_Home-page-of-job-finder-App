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

export const getjob_user = (current_page, company) => {
    var url;
    console.log(company);
    if (company) {
        url = `http://localhost:8081/jobs/${company}`+`/`+`${current_page}`
        return dispatch => {
            axios.get(url).then((res) => {
                console.log(res.data.message);
                localStorage.setItem('total_page', res.data.page)
                dispatch(getDataSuccess(res.data.message));
            }).catch((err) => {
                return err;
            })

        }
    }
    else {
        url = `http://localhost:8081/jobs/read/${current_page}`
        return dispatch => {
            axios.get(url).then((res) => {
                console.log(res.data.message);
                localStorage.setItem('total_page', res.data.page)
                dispatch(getDataSuccess(res.data.message));
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
                        dispatch(getjob_user(1,data.company_name));
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
                        dispatch(getjob_user(1,company_name));
                    })
                }
            }).catch((err) => {
                return err;
            })
    }
}



