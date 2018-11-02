import { matchPath } from 'react-router-dom'
import queryString from 'query-string'
import api from '@/api'
import helpers from '@/helpers'
import i18n from '@/i18n'
import history from '@/router/history'
import routes from '@/router/routes'
import store from '@/store'
import { signIn, setCategories, setCuisines } from '@/store/actions'

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
  },
  fetchGlobalData () {
    return helpers.fetchCurrentUser().then(() => {
      return helpers.fetchCategories()
    }).then(() => {
      return helpers.fetchCuisines()
    })
  },
  fetchCurrentUser () {
    return api.users.current().then((value) => {
      store.dispatch(signIn(value.data))
    })
  },
  fetchCategories () {
    return api.categories.readAll().then((value) => {
      const categories = helpers.mapAndSortCategories(value.data)
      store.dispatch(setCategories(categories))
    })
  },
  mapAndSortCategories (categories) {
    return categories.map((category) => {
      category.name = i18n.t(`recipe.category.${category.name}`)
      return category
    }).sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  },
  fetchCuisines () {
    return api.cuisines.readAll().then((value) => {
      const cuisines = helpers.mapAndSortCuisines(value.data)
      store.dispatch(setCuisines(cuisines))
    })
  },
  mapAndSortCuisines (cuisines) {
    return cuisines.map((cuisine) => {
      cuisine.name = i18n.t(`recipe.cuisine.${cuisine.name}`)
      return cuisine
    }).sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  }
}
