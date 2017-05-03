import React from 'react'
import { Route, Redirect} from 'react-router-dom'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter} from 'react-router-redux'

const history = createHistory()

// Pages
import ChannelsComponent from './components/views/channels/channelsComponent.js'
import LoginComponent from './components/views/loginComponent.js'
import LoudmouthComponent from './components/views/loudmouthComponent.js'
exports.router = (
  <ConnectedRouter history={history}>
    <div>
        <LoudmouthComponent></LoudmouthComponent>
        <Route path="/login" component={LoginComponent}/>
    </div>
  </ConnectedRouter>
)
//  <Redirect from="/" to="/createFillText" />
//   <Route path="/landingPage" component={LandingPage}/>
exports.history = history
