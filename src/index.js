import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import 'izitoast/dist/css/iziToast.css'
import '@/assets/styles/index.scss'
import App from '@/app'
import api from '@/api'
import i18n from '@/i18n'
import helpers from '@/helpers'
import notify from '@/notify'
import history from '@/router/history'
import store from '@/store'
import registerServiceWorker from './registerServiceWorker'

React.Component.prototype.$api = api
React.Component.prototype.$i18n = i18n
React.Component.prototype.$helpers = helpers
React.Component.prototype.$notify = notify

ReactDOM.render(
  <Router history={ history }>
    <Provider store={ store }>
      <App/>
    </Provider>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
