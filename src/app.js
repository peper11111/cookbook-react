import React from 'react'
import { Provider } from 'react-redux'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import api from '@/api'
import history from '@/router/history'
import routes from '@/router/routes'
import store from '@/store'

class App extends React.Component {
  render () {
    return (
      <Provider store={ store }>
        <Router history={ history }>
          <Switch>
            { routes.map((route) => (
              <Route
                exact
                key={ route.path }
                path={ route.path }
                component={ route.component }
              />
            )) }
            <Redirect to="/"/>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
