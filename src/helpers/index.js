import { matchPath } from 'react-router-dom'
import routes from '@/router/routes'

export default {
  requiresAuth (pathname) {
    const matched = routes.find((route) => {
      const match = matchPath(pathname, route)
      return match && match.exact
    })
    return matched && matched.meta && matched.meta.requiresAuth
  }
}
