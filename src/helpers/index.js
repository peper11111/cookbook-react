import { matchPath } from 'react-router-dom'
import queryString from 'query-string'
import helpers from '@/helpers'
import history from '@/router/history'
import routes from '@/router/routes'
import store from '@/store'

export default {
  checkNavigation () {
    if (helpers.requiresAuth(history.location.pathname) && !store.getState().auth.loggedIn) {
      history.push({
        pathname: '/sign-in',
        search: queryString.stringify({
          redirect: history.location.pathname
        })
      })
    }
  },
  requiresAuth (pathname) {
    const matched = routes.find((route) => {
      const match = matchPath(pathname, route)
      return match && match.isExact
    })
    return !!(matched && matched.meta && matched.meta.requiresAuth)
  }
}
