import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// Reducers
import {reducer as toastrReducer} from 'react-redux-toastr'
import authReducer from './authReducer'

// Combine Reducers
var reducers = combineReducers({
    auth: authReducer,
    router: routerReducer,
    toastr: toastrReducer,
})

export default reducers
