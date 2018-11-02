import React from 'react'
import { Provider } from 'react-redux'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import history from '@/router/history'
import routes from '@/router/routes'
import store from '@/store'
import requester from '@/hoc/requester'
import AppNavbar from '@/components/app-navbar'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pending: this.props.pending
    }
    this.wrap = this.props.wrap.bind(this)
  }
  get loggedIn () {
    return store.getState().auth.loggedIn
  }
  get requiresAuth () {
    return this.$helpers.requiresAuth(history.location.pathname)
  }
  componentDidMount () {
    // Because history.listen is not called on app start
    this.$helpers.checkNavigation()
    if (this.loggedIn) {
      this.wrap(this.$api.users.current())
    }
  }
  render () {
    return (
      <Provider store={ store }>
        <div className="o-typography">
          { !this.state.pending &&
            <Router history={ history }>
              <React.Fragment>
                { this.requiresAuth &&
                  <AppNavbar/>
                }
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
              </React.Fragment>
            </Router>
          }
        </div>
      </Provider>
    )
  }
}

export default requester(App)
