import lazyLoad from '@/lazyLoad'

const HomePage = lazyLoad(() => import('@/pages/home-page'))
const ExplorePage = lazyLoad(() => import('@/pages/explore-page'))
const FavouritePage = lazyLoad(() => import('@/pages/favourite-page'))
const SearchPage = lazyLoad(() => import('@/pages/search-page'))
const UserPage = lazyLoad(() => import('@/pages/user-page'))
const RecipePage = lazyLoad(() => import('@/pages/recipe-page'))
const SignInPage = lazyLoad(() => import('@/pages/intro/sign-in-page'))
const RegisterPage = lazyLoad(() => import('@/pages/intro/register-page'))
const RegisterVerifyPage = lazyLoad(() => import('@/pages/intro/register-verify-page'))
const ResetPage = lazyLoad(() => import('@/pages/intro/reset-page'))
const ResetConfirmPage = lazyLoad(() => import('@/pages/intro/reset-confirm-page'))

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
    path: '/search',
    component: SearchPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:id',
    component: UserPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/recipe/:id',
    component: RecipePage,
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
