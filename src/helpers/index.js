import { matchPath } from 'react-router-dom'
import routes from '@/router/routes'

export default {
  requiresAuth (location) {
    const matched = routes.find((route) => matchPath(location.pathname, route))
    return matched && matched.meta && matched.meta.requiresAuth
  }
}
