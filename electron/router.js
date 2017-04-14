import React from 'react'
import { Route, Redirect} from 'react-router-dom'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter} from 'react-router-redux'

const history = createHistory()

// Pages
import ExampleComponent from './components/views/exampleComponent.js'

exports.router = (
  <ConnectedRouter history={history}>
    <div>
        <ExampleComponent></ExampleComponent>
    </div>
  </ConnectedRouter>
)

exports.history = history
