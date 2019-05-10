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
        case 'GET_APPLY_COMPANY':{
            return state={
                ...state,
                data:action.payload
            };
        }
        case 'UPDATE_APPLY':{
            return state={
                ...state
            };
        }
        case 'CHECK_APPLY':{
            return state={
                ...state,
                data:action.payload
            };
        }
        default:
            return state;

    }
}
export default ApplyReducer;