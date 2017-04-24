import React from 'react'
import { Route, Redirect} from 'react-router-dom'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter} from 'react-router-redux'

const history = createHistory()

// Pages
import ExampleComponent from './components/views/exampleComponent.js'
import LoginComponent from './components/views/loginComponent.js'
exports.router = (
  <ConnectedRouter history={history}>
    <div>
        <LoginComponent></LoginComponent>
    </div>
  </ConnectedRouter>
)

exports.history = history
