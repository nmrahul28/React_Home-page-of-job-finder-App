const userReducer = (state = {data:[]}, action)=> {
    switch (action.type) {
        case 'GET_DATA_FULFILLED':{
            return state = {
                ...state,
                data: action.payload
            };
        }
        default:
            return state;

    }
}
export default userReducer;