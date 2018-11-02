import axios from 'axios'
import config from '@/config'
import helpers from '@/helpers'
import notify from '@/notify'
import history from '@/router/history'
import store from '@/store'
import { signOut } from '@/store/actions'

const http = axios.create({
  baseURL: config.baseURL,
  withCredentials: true
})

http.interceptors.response.use((value) => value, (reason) => {
  if (reason.response.status === 401) {
    if (helpers.requiresAuth(history.location.pathname) && store.getState().auth.loggedIn) {
      store.dispatch(signOut())
      notify.info('session-timeout')
      history.push('/sign-in')
    }
  } else {
    notify.error(reason.response.data.code)
  }
  return Promise.reject(reason)
})

export default http
