import {createStore, combineReducers,applyMiddleware} from 'redux';
import User from './reducers/reducers.js';
import thunk from 'redux-thunk';


export default createStore(combineReducers({
    jobs:User
}),applyMiddleware(thunk));