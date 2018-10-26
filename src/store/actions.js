import * as ActionTypes from '@/store/action-types'

export const signIn = (user) => ({
  type: ActionTypes.SIGN_IN,
  payload: user
})

export const signOut = () => ({
  type: ActionTypes.SIGN_OUT
})

export const setCategories = (categories) => ({
  type: ActionTypes.SET_CATEGORIES,
  payload: categories
})

export const setCuisines = (cuisines) => ({
  type: ActionTypes.SET_CUISINES,
  payload: cuisines
})

export const setUser = (user) => ({
  type: ActionTypes.SET_USER,
  payload: user
})

export const setRecipe = (recipe) => ({
  type: ActionTypes.SET_RECIPE,
  payload: recipe
})
