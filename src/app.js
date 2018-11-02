import React from 'react'
import { Provider } from 'react-redux'
import api from '@/api'
import helpers from '@/helpers'
import RouterView from '@/router'
import store from '@/store'
import requester from '@/hoc/requester'

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
  componentDidMount () {
    // Because history.listen is not called on app start
    helpers.checkNavigation()
    if (this.loggedIn) {
      this.wrap(api.users.current())
    }
  }
  render () {
    return (
      <Provider store={ store }>
        { !this.state.pending &&
          <div className="o-typography">
            <RouterView/>
          </div>
        }
      </Provider>
    )
  }
}

export default requester(App)
