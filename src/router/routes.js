import HomePage from '@/pages/home-page'

export default [
  {
    path: '/',
    component: HomePage,
    meta: { requiresAuth: true }
  }
]
