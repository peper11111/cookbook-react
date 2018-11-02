import React from 'react'
import ReactDOM from 'react-dom'
import 'izitoast/dist/css/iziToast.css'
import '@/assets/styles/index.scss'
import App from '@/app'
import api from '@/api'
import i18n from '@/i18n'
import helpers from '@/helpers'
import notify from '@/notify'
import registerServiceWorker from './registerServiceWorker'

React.Component.prototype.$api = api
React.Component.prototype.$i18n = i18n
React.Component.prototype.$helpers = helpers
React.Component.prototype.$notify = notify

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
