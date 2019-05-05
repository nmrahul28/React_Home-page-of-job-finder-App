const userReducer = (state = {data:{}}, action)=> {
    switch (action.type) {
        case "GET_LOGIN":{
            return state = {
                ...state,
                data: action.payload
            };
        }
        case "POST_SIGNUP":{
            return state = {
                ...state,
            };
        }
        default:
            return state;

    }
}
export default userReducer;