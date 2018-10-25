import React from 'react'
import ReactDOM from 'react-dom'
import 'izitoast/dist/css/iziToast.css'
import '@/assets/styles/index.scss'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
