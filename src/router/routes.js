import HomePage from '@/pages/home-page'
import ExplorePage from '@/pages/explore-page'
import FavouritePage from '@/pages/favourite-page'
import SignInPage from '@/pages/intro/sign-in-page'
import RegisterPage from '@/pages/intro/register-page'
import RegisterVerifyPage from '@/pages/intro/register-verify-page'
import ResetPage from '@/pages/intro/reset-page'
import ResetConfirmPage from '@/pages/intro/reset-confirm-page'

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
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/register/verify',
    component: RegisterVerifyPage
  },
  {
    path: '/reset',
    component: ResetPage
  },
  {
    path: '/reset/confirm',
    component: ResetConfirmPage
  }
]
