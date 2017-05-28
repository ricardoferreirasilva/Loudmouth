import ReactDOM from 'react-dom'
import React from 'react'
import store from './store'
import {router} from './router'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'

import './node_modules/react-redux-toastr/src/styles/index.scss'
require('./components/styles/global.css')
ReactDOM.render((
    <Provider store={store}>
        <div>
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates={true}
                position="top-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar/>
            {router}
        </div>
    </Provider>
), document.getElementById('root'))
