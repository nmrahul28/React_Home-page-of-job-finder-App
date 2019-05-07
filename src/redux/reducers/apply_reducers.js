const ApplyReducer = (state = {data:[]}, action)=> {
    switch (action.type) {
        case 'APPLY':{
            return state = {
                ...state,
            };
        }
        case 'GET_APPLY':{
            return state = {
                ...state,
                data: action.payload
            };
        }
        default:
            return state;

    }
}
export default ApplyReducer;