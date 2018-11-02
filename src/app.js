import React from 'react'
import { Provider } from 'react-redux'
import api from '@/api'
import helpers from '@/helpers'
import RouterView from '@/router'
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
        <div className="o-typography">
          <RouterView/>
        </div>
      </Provider>
    )
  }
}

export default App
