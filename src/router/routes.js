import HomePage from '@/pages/home-page'
import SignInPage from '@/pages/intro/sign-in-page'

export default [
  {
    path: '/',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/sign-in',
    component: SignInPage
  }
]
