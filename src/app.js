import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import RouterView from '@/router'
import AppNavbar from '@/components/app-navbar'
import Requester from '@/mixins/requester'

class App extends Requester {
  componentDidMount () {
    // Because history listener is not called on app start
    this.$helpers.checkNavigation()
    if (this.props.loggedIn) {
      this.fetchGlobalData()
    }
  }
  requiresAuth () {
    return this.$helpers.requiresAuth(this.props.history.location.pathname)
  }
  fetchGlobalData () {
    this.wrap(() => {
      return this.$helpers.fetchGlobalData()
    })
  }
  render () {
    if (!this.state.pending) {
      return (
        <div className="o-typography">
          { this.requiresAuth() &&
            <AppNavbar/>
          }
          <RouterView/>
        </div>
      )
    } else {
      return (
        <div className="o-page__loader"/>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn
})

export default withRouter(connect(mapStateToProps)(App))
