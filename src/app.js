import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import RouterView from '@/router'
import requester from '@/hoc/requester'
import AppNavbar from '@/components/app-navbar'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      done: !this.props.loggedIn,
      pending: this.props.pending
    }
    this.wrap = this.props.wrap.bind(this)
  }
  requiresAuth () {
    return this.$helpers.requiresAuth(this.props.history.location.pathname)
  }
  fetchGlobalData () {
    this.wrap(() => {
      return this.$helpers.fetchGlobalData().then(() => {
        this.setState({ done: true })
      })
    })
  }
  componentDidMount () {
    // Because history listener is not called on app start
    this.$helpers.checkNavigation()
    if (this.props.loggedIn) {
      this.fetchGlobalData()
    }
  }
  render () {
    if (this.state.done) {
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

export default requester(withRouter(connect(mapStateToProps)(App)))
