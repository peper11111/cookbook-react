import { matchPath } from 'react-router-dom'
import routes from '@/router/routes'

export default {
  requiresAuth (pathname) {
    const matched = routes.find((route) => matchPath(pathname, route))
    return matched && matched.meta && matched.meta.requiresAuth
  }
}
