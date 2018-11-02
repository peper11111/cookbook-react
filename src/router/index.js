import React from 'react'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import history from '@/router/history'
import routes from '@/router/routes'

class RouterView extends React.Component {
  render () {
    return (
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
    )
  }
}

export default RouterView
