import React from 'react'
import { Provider } from 'react-redux'
import { Route, Router } from 'react-router-dom'
import history from '@/router/history'
import routes from '@/router/routes'
import store from '@/store'

class App extends React.Component {
  render () {
    return (
      <Provider store={ store }>
        <Router history={ history }>
          <div>
            { routes.map((route) => (
              <Route
                exact
                key={ route.path }
                path={ route.path }
                component={ route.component }
              />
            )) }
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
