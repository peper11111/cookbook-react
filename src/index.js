import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'izitoast/dist/css/iziToast.css'
import '@/assets/styles/index.scss'
import App from '@/app'
import api from '@/api'
import i18n from '@/i18n'
import helpers from '@/helpers'
import notify from '@/notify'
import store from '@/store'
import registerServiceWorker from './registerServiceWorker'

React.Component.prototype.$api = api
React.Component.prototype.$i18n = i18n
React.Component.prototype.$helpers = helpers
React.Component.prototype.$notify = notify

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
