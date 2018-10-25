import React from 'react'
import { Route, Router } from 'react-router-dom'
import history from '@/router/history'
import routes from '@/router/routes'

class App extends React.Component {
  render () {
    return (
      <Router history={ history }>
        <React.Fragment>
          { routes.map((route) => (
            <Route
              exact
              key={ route.path }
              path={ route.path }
              component={ route.component }
            />
          )) }
        </React.Fragment>
      </Router>
    )
  }
}

export default App
