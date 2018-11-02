import HomePage from '@/pages/home-page'
import ExplorePage from '@/pages/explore-page'
import FavouritePage from '@/pages/favourite-page'
import SignInPage from '@/pages/intro/sign-in-page'

export default [
  {
    path: '/',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/explore',
    component: ExplorePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/favourite',
    component: FavouritePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/sign-in',
    component: SignInPage
  }
]
