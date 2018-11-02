import React from 'react'
import { Provider } from 'react-redux'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import api from '@/api'
import helpers from '@/helpers'
import history from '@/router/history'
import routes from '@/router/routes'
import store from '@/store'

class App extends React.Component {
  componentDidMount () {
    // Because history.listen is not called on app start
    helpers.checkNavigation()
    if (store.getState().auth.loggedIn) {
      api.users.current()
    }
  }
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
