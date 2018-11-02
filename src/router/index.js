import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import routes from '@/router/routes'

class RouterView extends React.Component {
  render () {
    return (
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
    )
  }
}

export default RouterView
