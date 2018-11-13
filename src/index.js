import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import api from '@/api'
import lazyLoad from '@/lazyLoad'
import i18n from '@/i18n'
import helpers from '@/helpers'
import notify from '@/notify'
import history from '@/router/history'
import store from '@/store'
import registerServiceWorker from '@/registerServiceWorker'
import 'izitoast/dist/css/iziToast.css'
import '@/assets/styles/index.scss'

React.Component.prototype.$api = api
React.Component.prototype.$i18n = i18n
React.Component.prototype.$helpers = helpers
React.Component.prototype.$notify = notify

const App = lazyLoad(() => import('@/app'))

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
