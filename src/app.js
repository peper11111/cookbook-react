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
      pending: this.props.pending
    }
    this.wrap = this.props.wrap.bind(this)
  }
  get requiresAuth () {
    return this.$helpers.requiresAuth(this.props.history.location.pathname)
  }
  componentDidMount () {
    // Because history.listen is not called on app start
    this.$helpers.checkNavigation()
    if (this.props.loggedIn) {
      this.wrap(this.$api.users.current())
    }
  }
  render () {
    if (!this.state.pending) {
      return (
        <div className="o-typography">
          { this.requiresAuth &&
            <AppNavbar/>
          }
          <RouterView/>
        </div>
      )
    }
    return (null)
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn
})

export default requester(withRouter(connect(mapStateToProps)(App)))
