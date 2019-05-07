import {createStore, combineReducers,applyMiddleware} from 'redux';
import Job from './reducers/job_reducers.js';
import User from './reducers/user_reducer.js';
import update_job from './reducers/job_update_reducer.js'
import applyreducer from './reducers/apply_reducers.js';
import thunk from 'redux-thunk';


export default createStore(combineReducers({
    jobs:Job,
    user:User,
    job_data:update_job,
    apply_data:applyreducer
}),applyMiddleware(thunk));