const JobUpdate = (state = {data:[]}, action)=> {
    switch (action.type) {
        case 'GET_ID':{
            return state = {
                ...state,
                data: action.payload
            };
        }
        default:
            return state;

    }
}
export default JobUpdate;