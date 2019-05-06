const JobReducer = (state = {data:[]}, action)=> {
    switch (action.type) {
        case 'GET_DATA_FULFILLED':{
            return state = {
                ...state,
                data: action.payload
            };
        }
        case 'ADD_JOB':{
            return state = {
                ...state,
            };
        }
        case 'UPDATE':{
            return state = {
                ...state,
            };
        }
        default:
            return state;

    }
}
export default JobReducer;