import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import reducers from './reducers'
import {history} from './router'

const middleware = routerMiddleware(history)
const store = createStore(reducers,applyMiddleware(middleware))
export default store
