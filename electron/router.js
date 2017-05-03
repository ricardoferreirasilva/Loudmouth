import React from 'react'
import { Route, Redirect} from 'react-router-dom'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter} from 'react-router-redux'

const history = createHistory()

// Pages
import ExampleComponent from './components/views/channels/channelsComponent.js'
import LoginComponent from './components/views/loginComponent.js'
exports.router = (
  <ConnectedRouter history={history}>
    <div>
        <ExampleComponent></ExampleComponent>
        <Route path="/login" component={ExampleComponent}/>
    </div>
  </ConnectedRouter>
)
//  <Redirect from="/" to="/createFillText" />
//   <Route path="/landingPage" component={LandingPage}/>
exports.history = history
